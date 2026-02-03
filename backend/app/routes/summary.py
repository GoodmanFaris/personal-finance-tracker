from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from app.core.database import get_session
from app.services.summary import SummaryService

router = APIRouter(prefix="/summary", tags=["summary"])

@router.get("/get_expenses_by_category", response_model=dict)
def get_expenses_by_category(
    start_date: str,
    end_date: str,
    session: Session = Depends(get_session)
):
    service = SummaryService(session)
    return service.get_expenses_by_category(
        user_id=1,  # Placeholder for authenticated user ID
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
        user_id=1,  # Placeholder for authenticated user ID
        start_date=start_date,
        end_date=end_date
    )


