from fastapi import HTTPException
from sqlmodel import Session

from app.models.user import User
from app.repositories.user import UserRepository
from app.schemas.user import UserPublic, UserUpdate
from app.core.password_hash import password_hash

class UserService:
    def __init__(self, session: Session):
        self.session = session
        self.repository = UserRepository(session)
    
    def update(self, *, user_id: int, user_in: UserUpdate) -> UserPublic:
        
        user = self.repository.get_by_id(user_id=user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        if user_in.name:
            user.name = user_in.name
        
        if user_in.country:
            user.country = user_in.country
        
        if user_in.currency:
            user.currency = user_in.currency
        
        return UserPublic.from_orm(self.repository.update(user=user))

