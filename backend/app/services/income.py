from fastapi import HTTPException
from sqlmodel import Session

from app.models.income import Income
from app.repositories.income import IncomeRepository
from app.schemas.income import IncomeCreate, IncomeRead, IncomeUpdate
from app.core.validators import validate_month

class IncomeService:
    def __init__(self, session: Session):
        self.session = session
        self.repository = IncomeRepository(session)

    def get_or_404(self, *, user_id: int, income_id: int) -> Income:
        obj = self.repository.get_by_id(user_id=user_id, income_id=income_id)
        if obj is None:
            raise HTTPException(status_code=404, detail="Income record not found")
        return obj

    def create_income(self, *, user_id: int, income_in: IncomeCreate) -> IncomeRead:
        if income_in.amount < 0:
            raise HTTPException(status_code=400, detail="Income amount cannot be negative")
        
        existing_income = self.repository.get_by_month(month=income_in.month, user_id=user_id)
        if existing_income:
            income_in.amount += existing_income[0].amount

        
        return self.repository.create(data=income_in.dict(), user_id=user_id)

    def update_income(self, *, user_id: int, income_id: int, payload: IncomeUpdate) -> IncomeRead:
        obj = self.get_or_404(user_id=user_id, income_id=income_id)

        if payload.amount is not None:
            if payload.amount < 0:
                raise HTTPException(status_code=400, detail="Income amount cannot be negative")
            obj.amount = payload.amount

        if payload.month is not None:
            obj.month = payload.month

        return self.repository.update(obj)
    
    def list_incomes_by_time_period(self, *, user_id: int, date_from: str, date_to: str) -> list[IncomeRead]:
        validate_month(date_from)
        validate_month(date_to)
        
        incomes = []
        current_month = date_from
        while current_month <= date_to:
            monthly_incomes = self.repository.get_by_month(month=current_month, user_id=user_id)
            incomes.extend(monthly_incomes)
            year, month = map(int, current_month.split("-"))
            if month == 12:
                month = 1
                year += 1
            else:
                month += 1
            current_month = f"{year:04d}-{month:02d}"
        return incomes