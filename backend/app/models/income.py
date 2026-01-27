from typing import Optional
from sqlmodel import SQLModel, Field


class Income(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    amount: float
    month: str = Field(index=True)