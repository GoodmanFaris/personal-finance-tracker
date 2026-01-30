from typing import Optional, List
from sqlmodel import Session, select
from app.models.income import Income
from app.models.transaction import Transaction
from app.models.user import User
from app.models.category import Category


class SummaryRepository:
    def __init__(self, session: Session):
        self.session = session

    def get_income_by_range(self, *, user_id: int, start_month: str, end_month: str ) -> List[Income]:
        statement = select(Income).where(
            Income.user_id == user_id,
            Income.month >= start_month,
            Income.month <= end_month
        ).order_by(Income.month)
        results = self.session.exec(statement).all()
        return results
    
    def get_transactions_by_range(self, *, user_id: int, start_month: str, end_month: str ) -> List[Transaction]:
        statement = select(Transaction).where(
            Transaction.user_id == user_id,
            Transaction.month >= start_month,
            Transaction.month <= end_month
        ).order_by(Transaction.date)
        results = self.session.exec(statement).all()
        return results
    
    def get_expenses_by_category(self, *, user_id: int, start_date: str, end_date: str ) -> List[Transaction]:
        statement = select(Transaction).where(
            Transaction.user_id == user_id,
            Transaction.date >= start_date,
            Transaction.date <= end_date,
            Transaction.type == "expense",
            Transaction.category_id == Category.id
        ).order_by(Transaction.date)
        results = self.session.exec(statement).all()
        return results
    
    def get_total_expenses(self, *, user_id: int, start_date: str, end_date: str ) -> float:
        statement = select(Transaction).where(
            Transaction.user_id == user_id,
            Transaction.date >= start_date,
            Transaction.date <= end_date,
            Transaction.type == "expense"
        )
        results = self.session.exec(statement).all()
        total_expenses = sum(transaction.amount for transaction in results)
        return total_expenses
    
    def get_total_income(self, *, user_id: int, start_month: str, end_month: str ) -> float:
        statement = select(Income).where(
            Income.user_id == user_id,
            Income.month >= start_month,
            Income.month <= end_month
        )
        results = self.session.exec(statement).all()
        total_income = sum(income.amount for income in results)
        return total_income
    
    def get_money_saved(self, *, user_id: int, start_month: str, end_month: str ) -> float:
        total_income = self.get_total_income(user_id=user_id, start_month=start_month, end_month=end_month)
        total_expenses = self.get_total_expenses(user_id=user_id, start_month=start_month, end_month=end_month)
        money_saved = total_income - total_expenses
        return money_saved