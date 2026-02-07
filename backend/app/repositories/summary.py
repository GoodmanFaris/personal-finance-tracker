from datetime import date
from typing import Optional, List
from sqlmodel import Session, func, select
from app.models.income import Income
from app.models.transaction import Transaction
from app.models.user import User
from app.models.category import Category
from app.schemas.summary import ExpensesByCategory


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
    
    def get_transactions_by_range(self, *, user_id: int, start_date: str, end_date: str ) -> List[Transaction]:
        statement = select(Transaction).where(
            Transaction.user_id == user_id,
            Transaction.date >= start_date,
            Transaction.date <= end_date
        ).order_by(Transaction.date)
        results = self.session.exec(statement).all()
        return results
    
    def get_expenses_by_category(self, *, user_id: int, start_date: date, end_date: date ) -> list[ExpensesByCategory]:
        statement = (
            select(Category.name, func.sum(Transaction.amount))
            .join(Transaction, Transaction.category_id == Category.id)
            .where(
                Transaction.user_id == user_id,
                Transaction.date >= start_date,
                Transaction.date < end_date,
                Transaction.type == "expense"
            )
            .group_by(Category.name)
        )
        results = self.session.exec(statement).all()
        return [ExpensesByCategory(category=name, total=float(total or 0)) for name, total in results]
    
    def get_total_expenses(self, *, user_id: int, start_date: date, end_date: date ) -> float:
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