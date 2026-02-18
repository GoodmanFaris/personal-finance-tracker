from fastapi import FastAPI
from sqlmodel import SQLModel, Session
from app.core.database import engine

from fastapi.middleware.cors import CORSMiddleware

from app.models.user import User
from app.models.transaction import Transaction
from app.models.category import Category
from app.models.income import Income
from app.routes import summary
from app.routes import balance
from app.routes import auth
from app.routes import user
from app.routes import contact


app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
    
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

    

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

from app.routes import category, transaction, income
app.include_router(category.router)
app.include_router(transaction.router)
app.include_router(income.router)
app.include_router(balance.router)
app.include_router(auth.router)
app.include_router(user.router)
app.include_router(summary.router)

app.include_router(contact.router)
