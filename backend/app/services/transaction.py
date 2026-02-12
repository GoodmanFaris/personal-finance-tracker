from fastapi import HTTPException
from sqlmodel import Session
from app.models.transaction import Transaction
from app.repositories.transaction import TransactionRepository
from app.schemas.transaction import TransactionCreate, TransactionRead, TransactionUpdate
from app.core.formating import month_to_date_range
from app.repositories.category import CategoryRepository


class TransactionService:
    def __init__(self, session: Session):
        self.session = session
        self.repository = TransactionRepository(session)

    def get_or_404(self, *, user_id: int, transaction_id: int) -> Transaction:
        obj = self.repository.get_by_id(user_id=user_id, transaction_id=transaction_id)
        if obj is None:
            raise HTTPException(status_code=404, detail="Transaction not found")
        return obj
    
    def get_by_id(self, *, user_id: int, transaction_id: int) -> TransactionRead:
        return self.get_or_404(user_id=user_id, transaction_id=transaction_id)
    
    def create(self, *, user_id: int, transaction_in: TransactionCreate) -> TransactionRead:
        categoties = CategoryRepository(self.session).list(user_id=user_id)
        
        if transaction_in.amount <= 0:
            raise HTTPException(status_code=400, detail="Transaction amount must be positive")
        
        if transaction_in.type not in ["expense", "income"]:
            raise HTTPException(status_code=400, detail="Transaction type must be either 'expense' or 'income'")
        
        if transaction_in.category_id is None:
            raise HTTPException(status_code=400, detail="Category ID must be provided for the transaction")
        
        if transaction_in.category_id not in [category.id for category in categoties]:
            raise HTTPException(status_code=400, detail="Category does not belong to the user")
        
        if transaction_in.category_id is not None:
            category = CategoryRepository(self.session).get_by_id(user_id=user_id, category_id=transaction_in.category_id)
            if category is None or not category.active:
                raise HTTPException(status_code=400, detail="Category is inactive or does not exist")
            
        # if transaction is expense then default_budget = default_budget - amount, if income then default_budget = default_budget + amount
        if transaction_in.type == "expense":
            category.default_budget -= transaction_in.amount
        elif transaction_in.type == "income":
            category.default_budget += transaction_in.amount

        return self.repository.create(data=transaction_in.dict(), user_id=user_id)
    
    def delete(self, *, user_id: int, transaction_id: int) -> TransactionRead:
        obj = self.get_or_404(user_id=user_id, transaction_id=transaction_id)
        return self.repository.delete(transaction=obj)
    
    def update(self, *, user_id: int, transaction_id: int, payload: TransactionUpdate) -> TransactionRead:
        obj = self.get_or_404(user_id=user_id, transaction_id=transaction_id)
        if payload.amount is not None:
            if payload.amount <= 0:
                raise HTTPException(status_code=400, detail="Transaction amount must be positive")
            obj.amount = payload.amount

        if payload.type is not None:
            if payload.type not in ["expense", "income"]:
                raise HTTPException(status_code=400, detail="Transaction type must be either 'expense' or 'income'")
            obj.type = payload.type

        if payload.category_id is not None:
            category = CategoryRepository(self.session).get_by_id(user_id=user_id, category_id=payload.category_id)
            if category is None or not category.active:
                raise HTTPException(status_code=400, detail="Category is inactive or does not exist")
            obj.category_id = payload.category_id

        if payload.description is not None:
            obj.description = payload.description

        if payload.date is not None:
            obj.date = payload.date

        return self.repository.update(obj)
    
    def list_transactions_by_month(self, *, user_id: int, month: str) -> list[TransactionRead]:
        return self.repository.list_by_month(month=month, user_id=user_id)
    
    def list_by_category(self, *, user_id: int, category_id: int) -> list[TransactionRead]:
        return self.repository.get_by_category(category_id=category_id, user_id=user_id)
    
    def list_transactions_by_time_period(self, *, user_id: int, start_date: str, end_date: str) -> list[TransactionRead]:
        start_month = start_date[:7]
        end_month = end_date[:7]
        all_transactions = []
        current_month = start_month

        while current_month <= end_month:
            transactions = self.repository.list_by_month(month=current_month, user_id=user_id)
            for transaction in transactions:
                if start_date <= transaction.date.strftime("%Y-%m-%d") <= end_date:
                    all_transactions.append(transaction)
            year, month = map(int, current_month.split('-'))
            if month == 12:
                month = 1
                year += 1
            else:
                month += 1
            current_month = f"{year:04d}-{month:02d}"

        return all_transactions
    
    def list_transactions_by_description(self, *, user_id: int, description: str) -> list[TransactionRead]:
        return self.repository.get_by_desc(description=description, user_id=user_id)
    
    def list(self, *, user_id: int) -> list[TransactionRead]:
        return self.repository.list(user_id=user_id)
    