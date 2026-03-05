from fastapi import APIRouter, Depends
from sqlmodel import Session

from app.core.database import get_session
from app.services.ai_summary import AIInsightService, AISummaryService
from app.core.ai.ai_advisor import AIAdvisorService
from app.schemas.user import UserPublic
from app.dependecies.auth import get_current_user

router = APIRouter(prefix="/ai", tags=["AI"])

@router.get("/insight")
def get_ai_insight(
    start_month: str,
    end_month: str,
    session: Session = Depends(get_session),
    current_user: UserPublic = Depends(get_current_user),
):
    service = AIInsightService(session)
    return service.get_or_generate(
        user_id=current_user.id,
        start_month=start_month,
        end_month=end_month,
    )