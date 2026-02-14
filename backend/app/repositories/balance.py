from http.client import HTTPException
from typing import Optional, List
from sqlmodel import Session, select
from app.models.balance import Balance

class BalanceRepository:
    def __init__(self, session: Session):
        self.session = session
    
    def create(self, *, data: dict, user_id: int) -> Balance:
        obj = Balance(**data, user_id=user_id)
        self.session.add(obj)
        self.session.commit()
        self.session.refresh(obj)
        return obj
    
    def get_by_id(self, *, balance_id: int, user_id: int) -> Optional[Balance]:
        statement = select(Balance).where(Balance.id == balance_id, Balance.user_id == user_id)
        result = self.session.exec(statement).first()
        return result
    
    def get_by_month(self, *, month: str, user_id: int) -> Optional[Balance]:
        statement = select(Balance).where(Balance.month == month, Balance.user_id == user_id)
        result = self.session.exec(statement).first()
        return result
    
    def get_all(self, *, user_id: int) -> list[Balance]:
        statement = select(Balance).where(Balance.user_id == user_id).order_by(Balance.month.desc())
        result = self.session.exec(statement).all()
        return result
    
    def update(self, balance: Balance) -> Balance:
        self.session.add(balance)
        self.session.commit()
        self.session.refresh(balance)
        return balance
    
    def delete(self, *, balance: Balance) -> None:
        self.session.delete(balance)
        self.session.commit()

