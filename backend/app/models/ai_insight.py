from typing import Optional
from sqlmodel import SQLModel, Field, UniqueConstraint
from datetime import datetime


class AIInsight(SQLModel, table=True):
    __tablename__ = "ai_insight"
    __table_args__ = (UniqueConstraint("user_id", "start_month", "end_month"),)

    id: Optional[int] = Field(default=None, primary_key=True)

    user_id: int = Field(foreign_key="user.id", index=True)

    start_month: str = Field(index=True)
    end_month: str = Field(index=True)

    summary_json: str
    insight_text: str

    model: str = Field(default="gpt-4o-mini")

    created_at: datetime = Field(default_factory=datetime.utcnow)