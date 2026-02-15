from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime
from sqlmodel import SQLModel, Field

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str = Field(index=True, nullable=False, unique=True)
    password_hash: Optional[str] = None

    provider: str = Field(default="local")  
    google_sub: Optional[str] = Field(default=None, index=True)

    created_at: datetime = Field(default_factory=datetime.utcnow)

    is_active: bool = Field(default=True)
    country: str = "BA"
    currency: str = "BAM"

    