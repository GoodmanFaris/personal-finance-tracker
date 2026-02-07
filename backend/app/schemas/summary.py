from typing import Optional
from pydantic import BaseModel, Field

class ExpensesByCategory(BaseModel):
    category: str
    total: float