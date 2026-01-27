from typing import Optional
from datetime import datetime, date
from sqlmodel import SQLModel, Field

class Transaction(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(index=True)
    category_id: int = Field(foreign_key="category.id")
    type: str 
    amount: float
    date: date
    description: str = ""
    created_at: datetime = Field(default_factory=datetime.utcnow, index=True)
