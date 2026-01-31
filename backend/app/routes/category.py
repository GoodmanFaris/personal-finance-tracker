from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from app.core.database import get_session
from app.services.category import CategoryService
from app.schemas.category import CategoryCreate, CategoryRead, CategoryUpdate

CURRENT_USER_ID = 1  # Placeholder for authenticated user ID

router = APIRouter(prefix="/category", tags=["category"])

@router.post("/", response_model=CategoryRead, status_code=201)
def create_category(
    category_data: CategoryCreate,
    session: Session = Depends(get_session)
):
    service = CategoryService(session)
    category = service.create(user_id=CURRENT_USER_ID, category_in=category_data)
    return category

@router.get("/{category_id}", response_model=CategoryRead)
def get_category(
    category_id: int,
    session: Session = Depends(get_session)
):
    service = CategoryService(session)
    category = service.get_by_id(category_id=category_id, user_id=CURRENT_USER_ID)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category

