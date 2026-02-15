import os
from datetime import datetime, timedelta, timezone

from fastapi import HTTPException
import jwt
from sqlmodel import Session
from dotenv import load_dotenv

from app.models.user import User
from app.repositories.user import UserRepository
from app.schemas.user import UserRegister, UserPublic, UserUpdate
from app.core.password_hash import password_hash, verify_password

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

class AuthService:
    def __init__(self, session: Session):
        self.session = session
        self.repository = UserRepository(session)
    
    def register(self, *, user_in: UserRegister) -> UserPublic:
        existing_user = self.repository.get_by_email(email=user_in.email)
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already in use")
        
        data = user_in.dict()
        data["password_hash"] = password_hash(data.pop("password"))
        return self.repository.create(data=data)
    
    def login(self, *, email: str, password: str) -> UserPublic:
        user = self.repository.get_by_email(email=email)
        if user is None:
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        if not verify_password(password, user.password_hash):
            raise HTTPException(status_code=401, detail="Invalid email or password")

        return user
    
    def create_access_token(self, *, user: User) -> str:
        if not SECRET_KEY:
            raise HTTPException(status_code=500, detail="SECRET_KEY is not configured")

        now = datetime.now(timezone.utc)
        expire = now + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

        payload = {
            "sub": str(user.id),
            "email": user.email,
            "iat": int(now.timestamp()),
            "exp": int(expire.timestamp()),
        }
        return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)