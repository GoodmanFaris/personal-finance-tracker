from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from app.core.database import get_session
from app.services.income import IncomeService
from app.schemas.income import IncomeCreate, IncomeRead, IncomeUpdate
from app.dependecies.auth import get_current_user
from app.schemas.user import UserPublic

router = APIRouter(prefix="/income", tags=["income"])

@router.post("/", response_model=IncomeRead, status_code=201)
def create_income(
    income_data: IncomeCreate,
    session: Session = Depends(get_session),
    current_user: UserPublic = Depends(get_current_user)
):
    service = IncomeService(session)
    income = service.create(user_id=current_user.id, income_in=income_data)
    return income

@router.get("/{income_id}", response_model=IncomeRead)
def get_income(
    income_id: int,
    session: Session = Depends(get_session),
    current_user: UserPublic = Depends(get_current_user)
):
    service = IncomeService(session)
    income = service.get_by_id(income_id=income_id, user_id=current_user.id)
    if not income:
        raise HTTPException(status_code=404, detail="Income not found")
    return income



@router.get("/month/{month}", response_model=IncomeRead)
def get_income(
    month: str,
    session: Session = Depends(get_session),
    current_user: UserPublic = Depends(get_current_user)
):

    service = IncomeService(session)
    #lazy get and/or create
    return service.get_or_create_for_lazy(user_id=current_user.id, month=month)


@router.put("/{month}", response_model=IncomeRead)
def upsert_income_by_month(
    month: str,
    income_data: IncomeUpdate,
    session: Session = Depends(get_session),
    current_user: UserPublic = Depends(get_current_user)
):
    service = IncomeService(session)
    income = service.upsert_by_month(
        month=month,
        amount=income_data.amount,
        user_id=current_user.id
    )
    return income

@router.put("/id/{income_id}", response_model=IncomeRead)
def update_income(
    income_id: int,
    income_data: IncomeUpdate,
    session: Session = Depends(get_session),
    current_user: UserPublic = Depends(get_current_user)
):
    service = IncomeService(session)
    income = service.get_by_id(income_id=income_id, user_id=current_user.id)
    if not income:
        raise HTTPException(status_code=404, detail="Income not found")
    for key, value in income_data.dict(exclude_unset=True).items():
        setattr(income, key, value)
    updated_income = service.update(income_id = income_id, user_id=current_user.id, payload=income_data)
    return updated_income

@router.delete("/id/{income_id}", status_code=204)
def delete_income(
    income_id: int,
    session: Session = Depends(get_session),
    current_user: UserPublic = Depends(get_current_user)
):
    service = IncomeService(session)
    income = service.get_by_id(income_id=income_id, user_id=current_user.id)
    if not income:
        raise HTTPException(status_code=404, detail="Income not found")
    service.delete(income_id=income_id, user_id=current_user.id)

@router.get("/list_by_time_period/", response_model=list[IncomeRead])
def list_incomes_by_time_period(
    date_from: str,
    date_to: str,
    session: Session = Depends(get_session),
    current_user: UserPublic = Depends(get_current_user)
):
    service = IncomeService(session)
    incomes = service.list_incomes_by_time_period(
        user_id=current_user.id,
        date_from=date_from,
        date_to=date_to
    )
    return incomes
