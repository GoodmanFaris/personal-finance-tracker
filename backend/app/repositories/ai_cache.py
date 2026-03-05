from __future__ import annotations

from typing import Optional
from sqlmodel import Session, select

from app.models.ai_insight import AIInsight 


class AICacheRepository:
    def __init__(self, session: Session):
        self.session = session

    def get_insight(self, *, user_id: int, start_month: str, end_month: str) -> Optional[AIInsight]:
        statement = select(AIInsight).where(
            AIInsight.user_id == user_id,
            AIInsight.start_month == start_month,
            AIInsight.end_month == end_month,
        )
        return self.session.exec(statement).first()

    def save_insight(self, *, insight: AIInsight) -> AIInsight:
        self.session.add(insight)
        self.session.commit()
        self.session.refresh(insight)
        return insight