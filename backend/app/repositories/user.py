from typing import Optional, List
from sqlmodel import Session, select
from app.models.user import User

class UserRepository:
    def __init__(self, session: Session):
        self.session = session

    def get_by_email(self, email: str) -> Optional[User]:
        statement = select(User).where(User.email == email)
        result = self.session.exec(statement).first()
        return result
    
    def get_by_id(self, user_id: int) -> Optional[User]:
        statement = select(User).where(User.id == user_id)
        result = self.session.exec(statement).first()
        return result
    
    def create(self, data: dict) -> User:
        user = User(**data)
        self.session.add(user)
        self.session.commit()
        self.session.refresh(user)
        return user
    
    def update(self, user: User) -> User:
        self.session.add(user)
        self.session.commit()
        self.session.refresh(user)
        return user
    
    def get_by_google_sub(self, google_sub: str) -> Optional[User]:
        statement = select(User).where(User.google_sub == google_sub)
        result = self.session.exec(statement).first()
        return result