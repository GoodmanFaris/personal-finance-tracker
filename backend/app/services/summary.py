from fastapi import HTTPException
from sqlmodel import Session

from app.repositories.summary import SummaryRepository

class SummaryService:
    def __init__(self, session: Session):
        self.session = session
        self.repository = SummaryRepository(session)

    