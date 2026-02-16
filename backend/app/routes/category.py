from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from app.core.database import get_session
from app.services.category import CategoryService
from app.schemas.category import CategoryCreate, CategoryRead, CategoryUpdate
from app.dependecies.auth import get_current_user
from app.schemas.user import UserPublic

router = APIRouter(prefix="/category", tags=["category"])

@router.post("/", response_model=CategoryRead, status_code=201)
def create_category(
    category_data: CategoryCreate,
    session: Session = Depends(get_session),
    current_user: UserPublic = Depends(get_current_user)
):
    service = CategoryService(session)
    category = service.create(user_id=current_user.id, category_in=category_data)
    return category

@router.get("/{category_id}", response_model=CategoryRead)
def get_category(
    category_id: int,
    session: Session = Depends(get_session),
    current_user: UserPublic = Depends(get_current_user)
):
    service = CategoryService(session)
    category = service.get_by_id(category_id=category_id, user_id=current_user.id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category

@router.put("/{category_id}", response_model=CategoryRead)
def update_category(
    category_id: int,
    category_data: CategoryUpdate,
    session: Session = Depends(get_session),
    current_user: UserPublic = Depends(get_current_user)
):
    service = CategoryService(session)
    category = service.update(
        category_id=category_id,
        user_id=current_user.id,
        payload=category_data
    )
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category

@router.delete("/{category_id}", status_code=204)
def delete_category(
    category_id: int,
    session: Session = Depends(get_session),
    current_user: UserPublic = Depends(get_current_user)
):
    service = CategoryService(session)
    category = service.deactivate(category_id=category_id, user_id=current_user.id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found or already inactive")
    return category


@router.post("/{category_id}/restore", response_model=CategoryRead)
def restore_category(
    category_id: int,
    session: Session = Depends(get_session),
    current_user: UserPublic = Depends(get_current_user)
):
    service = CategoryService(session)
    category = service.restore(category_id=category_id, user_id=current_user.id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found or already active")
    return category

@router.get("/{name}/by-name", response_model=CategoryRead)
def get_category_by_name(
    name: str,
    session: Session = Depends(get_session),
    current_user: UserPublic = Depends(get_current_user)
):
    service = CategoryService(session)
    category = service.get_by_name(name=name, user_id=current_user.id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category

@router.get("/list_all/active", response_model=list[CategoryRead])
def list_all_categories(
    session: Session = Depends(get_session),
    current_user: UserPublic = Depends(get_current_user)
):
    service = CategoryService(session)
    categories = service.copy_monthly_reset(user_id=current_user.id)
    return categories

@router.get("/list_all/inactive/active", response_model=list[CategoryRead])
def list_all_categories_including_inactive(
    session: Session = Depends(get_session),
    current_user: UserPublic = Depends(get_current_user)
):
    service = CategoryService(session)
    categories = service.list_all_categories_including_inactive(user_id=current_user.id)
    return categories

