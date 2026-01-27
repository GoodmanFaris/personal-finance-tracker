from typing import Literal, Optional
from pydantic import BaseModel, EmailStr, Field

class TransactionCreate(BaseModel):
    amount: float = Field(default=0, ge=0)
    type: Literal['income', 'expense']
    date: str
    description: Optional[str] = Field(default="", max_length=255)
    category_id: int

class TransactionRead(BaseModel):
    id: int
    amount: float
    type: Literal['income', 'expense']
    date: str
    description: str
    category_id: int

class TransactionUpdate(BaseModel):
    amount: Optional[float] = Field(default=None, ge=0)
    type: Optional[Literal['income', 'expense']] = None
    date: Optional[str] = None
    description: Optional[str] = Field(default=None, max_length=255)
    category_id: Optional[int] = None