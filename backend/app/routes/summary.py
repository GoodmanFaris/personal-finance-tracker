from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from app.core.database import get_session
from app.services.summary import SummaryService
from app.schemas.summary import ExpensesByCategory
from app.dependecies.auth import get_current_user
from app.schemas.user import UserPublic

router = APIRouter(prefix="/summary", tags=["summary"])

@router.get("/get_expenses_by_category", response_model=List[ExpensesByCategory])
def get_expenses_by_category(
    start_date: str,
    end_date: str,
    session: Session = Depends(get_session),
    current_user: UserPublic = Depends(get_current_user)
):
    service = SummaryService(session)
    return service.get_expenses_by_category(
        user_id=current_user.id,
        start_date=start_date,
        end_date=end_date
    )

@router.get("/get_total_expenses", response_model=float)
def get_total_expenses(
    start_date: str,
    end_date: str,
    session: Session = Depends(get_session),
    current_user: UserPublic = Depends(get_current_user)
):
    service = SummaryService(session)
    return service.get_total_expenses(
        user_id=current_user.id,
        start_date=start_date,
        end_date=end_date
    )


