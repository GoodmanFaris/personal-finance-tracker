from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from app.core.database import get_session
from app.services.transaction import TransactionService
from app.schemas.transaction import TransactionCreate, TransactionRead, TransactionUpdate

CURRENT_USER_ID = 1  # Placeholder for authenticated user ID

router = APIRouter(prefix="/transaction", tags=["transaction"])

@router.post("/", response_model=TransactionRead, status_code=201)
def create_transaction(
    transaction_data: TransactionCreate,
    session: Session = Depends(get_session)
):
    service = TransactionService(session)
    transaction = service.create(user_id=CURRENT_USER_ID, transaction_in=transaction_data)
    return transaction

@router.get("/{transaction_id}", response_model=TransactionRead)
def get_transaction(
    transaction_id: int,
    session: Session = Depends(get_session)
):
    service = TransactionService(session)
    transaction = service.get_by_id(transaction_id=transaction_id, user_id=CURRENT_USER_ID)
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return transaction

@router.put("/{transaction_id}", response_model=TransactionRead)
def update_transaction(
    transaction_id: int,
    transaction_data: TransactionUpdate,
    session: Session = Depends(get_session)
):
    service = TransactionService(session)
    transaction = service.update(
        transaction_id=transaction_id,
        user_id=CURRENT_USER_ID,
        payload=transaction_data
    )
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return transaction

@router.delete("/{transaction_id}", status_code=204)
def delete_transaction(
    transaction_id: int,
    session: Session = Depends(get_session)
):
    service = TransactionService(session)
    success = service.delete(transaction_id=transaction_id, user_id=CURRENT_USER_ID)
    if not success:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return None

@router.get("/list/", response_model=list[TransactionRead])
def list_transactions(
    session: Session = Depends(get_session)
):
    service = TransactionService(session)
    transactions = service.list(user_id=CURRENT_USER_ID)
    return transactions


