from typing import Optional, List
from sqlmodel import Session, select
from app.models.transaction import Transaction
from app.core.formating import month_to_date_range
from datetime import date

class TransactionRepository:
    def __init__(self, session: Session):
        self.session = session

    def create(self, *, data: dict, user_id: int) -> Transaction:
        obj = Transaction(**data, user_id=user_id)
        self.session.add(obj)
        self.session.commit()
        self.session.refresh(obj)
        return obj

    def list(self, *, user_id: int) -> List[Transaction]:
        statement = select(Transaction).where(Transaction.user_id == user_id).order_by(Transaction.id)
        results = self.session.exec(statement).all()
        return results

    def get_by_id(self, *, transaction_id: int, user_id: int) -> Optional[Transaction]:
        statement = select(Transaction).where(Transaction.id == transaction_id, Transaction.user_id == user_id)
        result = self.session.exec(statement).first()
        return result
    
    def get_by_category(self, *, category_id: int, user_id: int) -> List[Transaction]:
        statement = select(Transaction).where(Transaction.category_id == category_id, Transaction.user_id == user_id).order_by(Transaction.id)
        results = self.session.exec(statement).all()
        return results
    
    def list_by_month(self, *, month: str, user_id: int) -> List[Transaction]:
        y, m = map(int, month.split("-"))  # "2029-12" -> 2029, 12
        start = date(y, m, 1)

        # first day of next month
        if m == 12:
            end = date(y + 1, 1, 1)
        else:
            end = date(y, m + 1, 1)

        statement = (
            select(Transaction)
            .where(
                Transaction.user_id == user_id,
                Transaction.date >= start,
                Transaction.date < end,
            )
            .order_by(Transaction.date)
        )

        return self.session.exec(statement).all()
    
    def get_by_desc(self, *, description: str, user_id: int) -> List[Transaction]:
        statement = select(Transaction).where(Transaction.description.contains(description), Transaction.user_id == user_id).order_by(Transaction.id)
        results = self.session.exec(statement).all()
        return results

    def update(self, transaction: Transaction) -> Transaction:
        self.session.add(transaction)
        self.session.commit()
        self.session.refresh(transaction)
        return transaction

    def delete(self, *, transaction: Transaction) -> Transaction:
        self.session.delete(transaction)
        self.session.commit()
        return transaction