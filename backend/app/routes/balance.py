from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from app.core.database import get_session
from app.services.balance import BalanceService
from app.schemas.balance import BalanceCreate, BalanceRead, BalanceUpdate

CURRENT_USER_ID = 1  # Placeholder for authenticated user ID

router = APIRouter(prefix="/balance", tags=["balance"])

@router.post("/", response_model=BalanceRead, status_code=201)
def create_balance(
    balance_data: BalanceCreate,
    session: Session = Depends(get_session)
):
    service = BalanceService(session)
    balance = service.create(user_id=CURRENT_USER_ID, balance_in=balance_data)
    return balance

@router.get("/{balance_id}", response_model=BalanceRead)
def get_balance(
    balance_id: int,
    session: Session = Depends(get_session)
):
    service = BalanceService(session)
    balance = service.get_by_id(balance_id=balance_id, user_id=CURRENT_USER_ID)
    if not balance:
        raise HTTPException(status_code=404, detail="Balance record not found")
    return balance

@router.get("/list/all", response_model=list[BalanceRead])
def get_all_balances(
    session: Session = Depends(get_session)
):
    service = BalanceService(session)
    return service.get_all(user_id=CURRENT_USER_ID)

@router.put("/{balance_id}", response_model=BalanceRead)
def update_balance(
    balance_id: int,
    balance_data: BalanceUpdate,
    session: Session = Depends(get_session)
):
    service = BalanceService(session)
    balance = service.update(
        balance_id=balance_id,
        user_id=CURRENT_USER_ID,
        payload=balance_data
    )
    if not balance:
        raise HTTPException(status_code=404, detail="Balance record not found")
    return balance


@router.delete("/{balance_id}", status_code=204)
def delete_balance(
    balance_id: int,
    session: Session = Depends(get_session)
):
    service = BalanceService(session)
    balance = service.delete(balance_id=balance_id, user_id=CURRENT_USER_ID)
    if not balance:
        raise HTTPException(status_code=404, detail="Balance record not found")
    return balance

def get_balance_by_month(
    month: str,
    session: Session = Depends(get_session)
):
    service = BalanceService(session)
    balance = service.get_by_month(month=month, user_id=CURRENT_USER_ID)
    if not balance:
        raise HTTPException(status_code=404, detail="Balance record not found for the specified month")
    return balance

