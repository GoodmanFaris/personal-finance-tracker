from typing import Optional
from pydantic import BaseModel, EmailStr, Field

class IncomeCreate(BaseModel):
    amount: float = Field(default=0, ge=0)
    month: str

class IncomeRead(BaseModel):
    id: int
    amount: float
    month: str

class IncomeUpdate(BaseModel):
    amount: Optional[float] = Field(default=None, ge=0)
    month: Optional[str] = None