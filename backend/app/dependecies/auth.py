import os
from dotenv import load_dotenv
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import Session
import jwt
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

from app.models.user import User
from app.repositories.user import UserRepository
from app.schemas.user import UserRegister, UserPublic, UserUpdate
from app.core.password_hash import password_hash, verify_password
from backend.app.core.database import get_session


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
    
def get_current_user(
        session: Session = Depends(get_session),
        token: str = Depends(oauth2_scheme)) -> UserPublic:
    try:
        if not SECRET_KEY:
            raise HTTPException(status_code=500, detail="SECRET_KEY is not configured")
        
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(401, "Invalid authentication credentials")
        
        try:
            user_id = int(user_id)
        except ValueError:
            raise HTTPException(401, "Invalid authentication credentials")

    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    user_repo = UserRepository(session)
    user = user_repo.get_by_id(user_id=user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    return UserPublic.from_orm(user)