from fastapi import APIRouter, Depends
from sqlmodel import Session

from app.core.database import get_session
from app.services.user import UserService
from app.schemas.user import UserPublic, UserUpdate
from app.dependecies.auth import get_current_user

router = APIRouter(prefix="/user", tags=["user"])

@router.put("/me", response_model=UserPublic)
def update_profile(
    payload: UserUpdate,
    current_user: UserPublic = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    service = UserService(session)
    updated_user = service.update(user_id=current_user.id, user_in=payload)
    return updated_user