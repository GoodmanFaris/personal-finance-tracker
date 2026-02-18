from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from app.core.database import get_session
from app.services.summary import SummaryService
from app.schemas.summary import ExpensesByCategory
from app.dependecies.auth import get_current_user
from app.schemas.user import UserPublic

router = APIRouter(prefix="/summary", tags=["summary"])

@router.get("/bundle")
def summary_bundle(
    start_month: str,
    end_month: str,
    top_n: int = 10,
    session: Session = Depends(get_session),
    current_user: UserPublic = Depends(get_current_user),
):
    service = SummaryService(session)
    return service.get_summary_bundle(
        user_id=current_user.id,
        start_month=start_month,
        end_month=end_month,
        top_n=top_n,
    )

