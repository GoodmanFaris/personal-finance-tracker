from typing import Optional
from sqlmodel import SQLModel, Field

class Category(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    user_id: int = Field(foreign_key="user.id")
    default_budget: float = 0.0
    budget: Optional[float] = 0.0
    description: Optional[str] = ""
    active: bool = True

    