from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from app.core.database import get_session
from app.services.auth import AuthService
from app.schemas.user import UserPublic, UserRegister, UserLogin, UserUpdate, TokenResponse
from app.dependecies.auth import get_current_user
from backend.app.models.user import User

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
    # For JWT, logout is typically handled on the client side by deleting the token.
    # Optionally, you could implement token blacklisting here.
    return

@router.get("/me", response_model=UserPublic)
def me(current_user: UserPublic = Depends(get_current_user)):
    return current_user
