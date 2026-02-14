from typing import Optional
from pydantic import BaseModel, EmailStr, Field

class CategoryCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    default_budget: float = Field(default=0, ge=0)
    budget: Optional[float] = Field(default=0, ge=0)
    description: Optional[str] = Field(default="", max_length=255)
    active: bool = True

class CategoryRead(BaseModel):
    id: int
    name: str
    default_budget: float
    budget: Optional[float]
    description: Optional[str]
    active: bool

class CategoryUpdate(BaseModel):
    name: Optional[str] = Field(default=None, min_length=1, max_length=100)
    default_budget: Optional[float] = Field(default=None, ge=0)
    budget: Optional[float] = Field(default=None, ge=0)
    description: Optional[str] = Field(default=None, max_length=255)
    active: Optional[bool] = None