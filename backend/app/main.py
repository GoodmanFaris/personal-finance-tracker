from fastapi import FastAPI
from sqlmodel import SQLModel, Session
from app.core.database import engine

from app.models.user import User
from app.models.transaction import Transaction
from app.models.category import Category
from app.models.income import Income


app = FastAPI()


CURRENT_USER_ID = 1

@app.on_event("startup")
async def startup_event():
#    SQLModel.metadata.create_all(engine)

    with Session(engine) as session:
        user = session.get(User, CURRENT_USER_ID)
        if not user:
            session.add(User(
                id=CURRENT_USER_ID,
                name="Local User",
                email="local@example.com",
                country="BA",
                currency="BAM",
            ))
            session.commit()
    

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

from app.routes import category, transaction, income
app.include_router(category.router)
app.include_router(transaction.router)
app.include_router(income.router)
from app.routes import summary
app.include_router(summary.router)