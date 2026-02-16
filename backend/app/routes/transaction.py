from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from app.core.database import get_session
from app.services.transaction import TransactionService
from app.schemas.transaction import TransactionCreate, TransactionRead, TransactionUpdate
from app.dependecies.auth import get_current_user
from app.schemas.user import UserPublic

router = APIRouter(prefix="/transaction", tags=["transaction"])

@router.post("/", response_model=TransactionRead, status_code=201)
def create_transaction(
    transaction_data: TransactionCreate,
    session: Session = Depends(get_session),
    current_user: UserPublic = Depends(get_current_user)
):
    service = TransactionService(session)
    transaction = service.create(user_id=current_user.id, transaction_in=transaction_data)
    return transaction

@router.get("/{transaction_id}", response_model=TransactionRead)
def get_transaction(
    transaction_id: int,
    session: Session = Depends(get_session),
    current_user: UserPublic = Depends(get_current_user)
):
    service = TransactionService(session)
    transaction = service.get_by_id(transaction_id=transaction_id, user_id=current_user.id)
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return transaction

@router.put("/{transaction_id}", response_model=TransactionRead)
def update_transaction(
    transaction_id: int,
    transaction_data: TransactionUpdate,
    session: Session = Depends(get_session),
    current_user: UserPublic = Depends(get_current_user)
):
    service = TransactionService(session)
    transaction = service.update(
        transaction_id=transaction_id,
        user_id=current_user.id,
        payload=transaction_data
    )
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return transaction

@router.delete("/{transaction_id}", status_code=204)
def delete_transaction(
    transaction_id: int,
    session: Session = Depends(get_session),
    current_user: UserPublic = Depends(get_current_user)
):
    service = TransactionService(session)
    success = service.delete(transaction_id=transaction_id, user_id=current_user.id)
    if not success:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return None

@router.get("/list-by-category/{category_id}", response_model=list[TransactionRead])
def list_transactions_by_category(
    category_id: int,
    session: Session = Depends(get_session),
    current_user: UserPublic = Depends(get_current_user)
):
    service = TransactionService(session)
    transactions = service.list_by_category(category_id=category_id, user_id=current_user.id)
    return transactions

@router.get("/list/", response_model=list[TransactionRead])
def list_transactions(
    session: Session = Depends(get_session),
    current_user: UserPublic = Depends(get_current_user)
):
    service = TransactionService(session)
    transactions = service.list(user_id=current_user.id)
    return transactions


