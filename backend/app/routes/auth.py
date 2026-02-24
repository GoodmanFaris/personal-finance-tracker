import os

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlmodel import Session

from app.core.database import get_session
from app.services.auth import AuthService
from app.schemas.user import UserPublic, UserRegister, UserLogin, UserUpdate, TokenResponse
from app.dependecies.auth import get_current_user
import secrets
from urllib.parse import urlencode
from fastapi.responses import RedirectResponse
import httpx
import jwt
from jwt import PyJWKClient
from fastapi.responses import JSONResponse
from sqlmodel import Session, select

from app.models.user import User

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=UserPublic, status_code=201)
def register(
    user_data: UserRegister,
    session: Session = Depends(get_session)
):
    service = AuthService(session)
    user = service.register(user_in=user_data)
    return user

@router.post("/login", response_model=TokenResponse)
def login(data: UserLogin, session: Session = Depends(get_session)):
    service = AuthService(session)
    user = service.login(email=data.email, password=data.password)
    access_token = service.create_access_token(user=user)
    return TokenResponse(access_token=access_token)


@router.post("/logout", status_code=204)
def logout():
    return

@router.get("/me", response_model=UserPublic)
def me(current_user: UserPublic = Depends(get_current_user)):
    return current_user

@router.get("/google/start")
def google_start(session: Session = Depends(get_session)):
    # Env vars (moraš imati u .env / Railway vars)
    client_id = os.getenv("GOOGLE_CLIENT_ID", "")
    redirect_uri = os.getenv("GOOGLE_REDIRECT_URI", "")
    if not client_id or not redirect_uri:
        raise RuntimeError("Google OAuth is not configured")

    state = secrets.token_urlsafe(32)

    params = {
        "client_id": client_id,
        "redirect_uri": redirect_uri,
        "response_type": "code",
        "scope": "openid email profile",
        "access_type": "offline",  
        "prompt": "consent",        
        "state": state,
    }

    google_auth_url = "https://accounts.google.com/o/oauth2/v2/auth?" + urlencode(params)

    resp = RedirectResponse(url=google_auth_url, status_code=302)

    resp.set_cookie(
        key="oauth_state",
        value=state,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=30 * 60, 
        path="/",
    )
    return resp

GOOGLE_JWKS_URL = "https://www.googleapis.com/oauth2/v3/certs"


@router.get("/google/callback")
async def google_callback(
    request: Request,
    code: str,
    state: str,
    session: Session = Depends(get_session),
):

    cookie_state = request.cookies.get("oauth_state")
    if not cookie_state or cookie_state != state:
        raise HTTPException(status_code=400, detail="Invalid OAuth state")

    client_id = os.getenv("GOOGLE_CLIENT_ID", "")
    client_secret = os.getenv("GOOGLE_CLIENT_SECRET", "")
    redirect_uri = os.getenv("GOOGLE_REDIRECT_URI", "")

    if not client_id or not client_secret or not redirect_uri:
        raise HTTPException(status_code=500, detail="Google OAuth not configured")

    token_url = "https://oauth2.googleapis.com/token"
    data = {
        "client_id": client_id,
        "client_secret": client_secret,
        "code": code,
        "grant_type": "authorization_code",
        "redirect_uri": redirect_uri,
    }

    async with httpx.AsyncClient(timeout=15) as client:
        token_resp = await client.post(token_url, data=data)

    if token_resp.status_code != 200:
        raise HTTPException(status_code=400, detail="Failed to obtain Google token")

    token_json = token_resp.json()
    id_token = token_json.get("id_token")
    if not id_token:
        raise HTTPException(status_code=400, detail="No id_token returned by Google")

    try:
        jwk_client = PyJWKClient(GOOGLE_JWKS_URL)
        signing_key = jwk_client.get_signing_key_from_jwt(id_token).key

        payload = jwt.decode(
            id_token,
            signing_key,
            algorithms=["RS256"],
            audience=client_id,
            options={"require": ["exp", "iat", "sub"]},
        )

        iss = payload.get("iss")
        if iss not in ("https://accounts.google.com", "accounts.google.com"):
            raise HTTPException(status_code=400, detail="Invalid token issuer")

    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid Google id_token")

    email = payload.get("email")
    name = payload.get("name")
    google_sub = payload.get("sub")

    if not email or not google_sub:
        raise HTTPException(status_code=400, detail="Invalid Google payload")


    user = session.exec(select(User).where(User.google_sub == google_sub)).first()

    if not user:
        user_by_email = session.exec(select(User).where(User.email == email)).first()
        if user_by_email:
            user = user_by_email
            user.google_sub = google_sub
            user.provider = "google"
        else:
            user = User(
                name=name or email.split("@")[0],
                email=email,
                provider="google",
                google_sub=google_sub,
            )
            session.add(user)

        session.commit()
        session.refresh(user)


    service = AuthService(session)
    access_token = service.create_access_token(user=user)

    resp = JSONResponse({"access_token": access_token, "token_type": "bearer"})
    resp.delete_cookie("oauth_state", path="/")
    return resp