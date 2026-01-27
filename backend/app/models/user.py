from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime
from sqlmodel import SQLModel, Field

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str
    password_hash: str = "" 
    country: str = "BA"
    currency: str = "BAM"

    