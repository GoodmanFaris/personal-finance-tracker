from typing import Optional
from pydantic import BaseModel, EmailStr, Field

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserPublic(BaseModel):
    id: int
    name: str
    email: EmailStr
    country: str
    currency: str

    class Config:
        from_attributes = True


class UserUpdate(BaseModel):
    email: Optional[EmailStr] = Field(default=None, max_length=255)
    password: Optional[str] = Field(default=None, min_length=8, max_length=128)
    name: Optional[str] = Field(default=None, max_length=100)
    country: Optional[str] = Field(default=None, max_length=100)
    currency: Optional[str] = Field(default=None, max_length=10)

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

