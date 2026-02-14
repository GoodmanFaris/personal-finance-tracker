from typing import Optional
from pydantic import BaseModel, Field

class BalanceCreate(BaseModel):
    amount: float
    month: str 

class BalanceRead(BaseModel):
    id: int
    amount: float
    month: str

class BalanceUpdate(BaseModel):
    amount: Optional[float] = None