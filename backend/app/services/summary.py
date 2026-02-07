from fastapi import HTTPException
from sqlmodel import Session

from app.repositories.summary import SummaryRepository
from app.core.formating import month_to_date_range

class SummaryService:
    def __init__(self, session: Session):
        self.session = session
        self.repository = SummaryRepository(session)

    def get_income_by_range(self, *, user_id: int, start_month: str, end_month: str):
        return self.repository.get_income_by_range(
            user_id=user_id,
            start_month=start_month,
            end_month=end_month
        )
    
    def get_transactions_by_range(self, *, user_id: int, start_month: str, end_month: str):
        return self.repository.get_transactions_by_range(
            user_id=user_id,
            start_month=start_month,
            end_month=end_month
        )
    
    def get_expenses_by_category(self, *, user_id: int, start_date: str, end_date: str):
        start_date, _ = month_to_date_range(start_date)
        _, end_date = month_to_date_range(end_date)
        return self.repository.get_expenses_by_category(
            user_id=user_id,
            start_date=start_date,
            end_date=end_date
        )
    
    def get_total_expenses(self, *, user_id: int, start_date: str, end_date: str):
        start_date, _ = month_to_date_range(start_date)
        _, end_date = month_to_date_range(end_date)
        results =  self.repository.get_total_expenses(
            user_id=user_id,
            start_date=start_date,
            end_date=end_date
        )
        return results

    
    def get_total_income(self, *, user_id: int, start_date: str, end_date: str):
        return self.repository.get_total_income(
            user_id=user_id,
            start_date=start_date,
            end_date=end_date
        )
    
    def get_monney_saved(self, *, user_id: int, start_month: str, end_month: str):
        return self.repository.get_money_saved(
            user_id=user_id,
            start_month=start_month,
            end_month=end_month
        )
    