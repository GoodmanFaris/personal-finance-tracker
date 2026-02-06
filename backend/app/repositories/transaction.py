from typing import Optional, List
from sqlmodel import Session, select
from app.models.transaction import Transaction

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
        statement = select(Transaction).where(Transaction.date.startswith(month), Transaction.user_id == user_id).order_by(Transaction.date)
        results = self.session.exec(statement).all()
        return results
    
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