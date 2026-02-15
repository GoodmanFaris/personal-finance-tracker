from typing import List, Optional
from fastapi import HTTPException
from sqlmodel import Session
from decimal import Decimal

from app.models.balance import Balance
from app.repositories.balance import BalanceRepository
from app.schemas.balance import BalanceCreate, BalanceRead, BalanceUpdate
from app.core.validators import validate_month
from app.core.formating import current_month_key

class BalanceService:
    def __init__(self, session: Session):
        self.session = session
        self.repository = BalanceRepository(session)

    def get_or_404(self, *, user_id: int, balance_id: int) -> Balance:
        obj = self.repository.get_by_id(user_id=user_id, balance_id=balance_id)
        if obj is None:
            raise HTTPException(status_code=404, detail="Balance record not found")
        return obj
    
    def get_current(self, *, user_id: int) -> Optional[BalanceRead]:
        current_month = current_month_key()
        return self.repository.get_by_month(user_id=user_id, month=current_month)

    
    def get(self, *, user_id: int, balance_id: int) -> list[BalanceRead]:
        return self.repository.get_all(user_id=user_id, balance_id=balance_id)
    
    def get_by_id(self, *, user_id: int, balance_id: int) -> BalanceRead:
        return self.get_or_404(user_id=user_id, balance_id=balance_id)
    
    def create(self, *, user_id: int, balance_in: BalanceCreate) -> BalanceRead:
        if balance_in.amount < 0:
            raise HTTPException(status_code=400, detail="Balance amount cannot be negative")
        
        existing_balance = self.repository.get_by_month(month=balance_in.month, user_id=user_id)
        if existing_balance:
            balance_in.amount += existing_balance[0].amount

        balance_in.month = validate_month(balance_in.month)
        if balance_in.month is None:
            raise HTTPException(status_code=400, detail="Balance month must be in format YYYY-MM")

        
        return self.repository.create(data=balance_in.dict(), user_id=user_id)
    
    def get_by_month(self, *, user_id: int, month: str) -> list[Optional[BalanceRead]]:
        validate_month(month)
        
        return self.repository.get_by_month(month=month, user_id=user_id)
    
    def update(self, *, user_id: int, balance_id: int, payload: BalanceUpdate) -> BalanceRead:
        obj = self.get_or_404(user_id=user_id, balance_id=balance_id)
        
        if payload.amount is not None:
            if payload.amount < 0:
                raise HTTPException(status_code=400, detail="Balance amount cannot be negative")
            obj.amount = payload.amount
        
        return self.repository.update(obj)
    
    def delete(self, *, user_id: int, balance_id: int) -> None:
        obj = self.get_or_404(user_id=user_id, balance_id=balance_id)
        self.repository.delete(balance=obj)
    
    def get_all(self, *, user_id: int) -> list[BalanceRead]:
        balances = self.repository.get_all(user_id=user_id)
        return balances

    def recompute_balance(self, *, user_id: int, month: str) -> None:
        from app.services.income import IncomeService
        from app.services.transaction import TransactionService
        from app.services.category import CategoryService
        
        income_obj = IncomeService(self.session).get_by_month(user_id=user_id, month=month)
        income_amount = income_obj.amount if income_obj else 0.0

        txs = TransactionService(self.session).list_transactions_by_month(user_id=user_id, month=month) or []
        net = 0.0

        for t in txs:
            
            amt = t.amount
            if getattr(t, "type", None) == "expense":
                net -= amt
            else:
                net += amt

        new_amount = income_amount + net

        balance = self.repository.get_by_month(user_id=user_id, month=month)

        if balance:
            balance.amount = new_amount
            self.repository.update(balance)
        else:
            self.repository.create(
                user_id=user_id,
                data={"month": month, "amount": new_amount},
            )
