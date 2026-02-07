from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from app.core.database import get_session
from app.services.summary import SummaryService
from app.schemas.summary import ExpensesByCategory

router = APIRouter(prefix="/summary", tags=["summary"])

USER_ID = 1;

@router.get("/get_expenses_by_category", response_model=List[ExpensesByCategory])
def get_expenses_by_category(
    start_date: str,
    end_date: str,
    session: Session = Depends(get_session)
):
    service = SummaryService(session)
    return service.get_expenses_by_category(
        user_id=USER_ID,  # Placeholder for authenticated user ID
        start_date=start_date,
        end_date=end_date
    )

@router.get("/get_total_expenses", response_model=float)
def get_total_expenses(
    start_date: str,
    end_date: str,
    session: Session = Depends(get_session)
):
    service = SummaryService(session)
    return service.get_total_expenses(
        user_id=USER_ID,  # Placeholder for authenticated user ID
        start_date=start_date,
        end_date=end_date
    )


