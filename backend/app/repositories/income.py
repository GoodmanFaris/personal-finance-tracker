from http.client import HTTPException
from typing import Optional, List
from sqlmodel import Session, select
from app.models.income import Income

class IncomeRepository:
    def __init__(self, session: Session):
        self.session = session
    
    def create(self, *, data: dict, user_id: int) -> Income:
        obj = Income(**data, user_id=user_id)
        self.session.add(obj)
        self.session.commit()
        self.session.refresh(obj)
        return obj
    
    def get_by_id(self, *, income_id: int, user_id: int) -> Optional[Income]:
        statement = select(Income).where(Income.id == income_id, Income.user_id == user_id)
        result = self.session.exec(statement).first()
        return result
    
    def get_by_month(self, *, month: str, user_id: int) -> Income:
        statement = select(Income).where(Income.month == month, Income.user_id == user_id).order_by(Income.id)
        results = self.session.exec(statement).first()
        return results
    
    def upsert_by_month(self, *, month: str, amount: float, user_id: int) -> Income:
        obj = self.get_by_month(user_id=user_id, month=month)

        if obj is None:
            #raise HTTPException(status_code=404, detail="Income record for the specified month not found")
            obj = Income(user_id=user_id, month=month, amount=amount)
            self.session.add(obj)
            self.session.commit()
            self.session.refresh(obj)
            return obj
        else:
            obj.amount = amount

        self.session.commit()
        self.session.refresh(obj)
        return obj
    
    def update(self, income: Income) -> Income:
        self.session.add(income)
        self.session.commit()
        self.session.refresh(income)
        return income
    
    def delete(self, income: Income) -> None:
        self.session.delete(income)
        self.session.commit()
    
