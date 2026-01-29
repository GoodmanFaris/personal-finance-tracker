from fastapi import HTTPException
from sqlmodel import Session

from app.models.user import User
from app.repositories.user import UserRepository
from app.schemas.user import UserCreate, UserRead, UserUpdate

class UserService:
    def __init__(self,session: Session):
        self.session = session
        self.repository = UserRepository(session)
    
    def get_current_user(self, *, user_id: int) -> User:
        user_id = 1 #testing purpose
        obj = self.repository.get_by_id(user_id=user_id)
        if obj is None:
            raise HTTPException(status_code=404, detail="User not found")
        return obj
    
    def update_profile(self, *, user_id: int, payload: UserUpdate) -> UserRead:
        obj = self.get_current_user(user_id=user_id)

        if payload.email is not None:
            existing_user = self.repository.get_by_email(email=payload.email)
            if existing_user and existing_user.id != user_id:
                raise HTTPException(status_code=400, detail="Email already in use")
            obj.email = payload.email

        if payload.full_name is not None:
            obj.full_name = payload.full_name

        return self.repository.update(obj)
    
    def create_user(self, *, user_in: UserCreate) -> UserRead:
        existing_user = self.repository.get_by_email(email=user_in.email)
        if user_in.currency is None:
            user_in.currency = "EUR"

        if existing_user:
            raise HTTPException(status_code=400, detail="Email already in use")
        
        return self.repository.create(data=user_in.dict())
    
