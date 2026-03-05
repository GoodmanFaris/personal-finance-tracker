from __future__ import annotations

from dataclasses import dataclass
import json
from typing import Any, Dict, List, Optional, Tuple
from datetime import date

from sqlmodel import Session

from app.services.summary import SummaryService 
from app.core.formating import month_to_date_range
from app.core.validators import validate_month
from app.core.ai.ai_advisor import AIAdvisorService
from app.models.ai_insight import AIInsight
from app.repositories.ai_cache import AICacheRepository


def _to_float(x: Any, default: float = 0.0) -> float:
    try:
        if x is None:
            return default
        return float(x)
    except Exception:
        return default

def _clamp(n: float, lo: float, hi: float) -> float:
    return max(lo, min(hi, n))

def _period_label(start_month: str, end_month: str) -> str:
    if start_month == end_month:
        return start_month
    return f"{start_month} → {end_month}"


@dataclass
class AISummaryConfig:
    top_categories_limit: int = 5
    top_expenses_limit: int = 5
    include_monthly_series: bool = True
    include_top_expenses: bool = True


class AISummaryService:
    def __init__(self, session: Session, *, config: Optional[AISummaryConfig] = None):
        self.session = session
        self.summary = SummaryService(session)
        self.config = config or AISummaryConfig()

    def _months_to_dates(self, start_month: str, end_month: str) -> Tuple[date, date]:
        start_date, _ = month_to_date_range(start_month)
        _, end_date = month_to_date_range(end_month)
        return start_date, end_date

    def validate_range(self, start_month: str, end_month: str) -> Tuple[str, str]:
        start_month = validate_month(start_month)
        end_month = validate_month(end_month)
        start_date, _ = month_to_date_range(start_month)
        _, end_date = month_to_date_range(end_month)
        if start_date > end_date:
            raise ValueError("Invalid range: start_month must be before end_month")
        return start_month, end_month

    def build(self, *, user_id: int, start_month: str, end_month: str) -> Dict[str, Any]:
        start_month, end_month = self.validate_range(start_month, end_month)
        start_date, end_date = self._months_to_dates(start_month, end_month)
        bundle = self.summary.get_summary_bundle(
            user_id=user_id,
            start_month=start_month,
            end_month=end_month,
            top_n=max(self.config.top_expenses_limit, 10), 
        )
        totals = bundle.get("totals", {}) or {}
        income = _to_float(totals.get("income"), 0.0)
        expenses = _to_float(totals.get("expenses"), 0.0)
        net = income - expenses

        savings_rate = (net / income) if income > 0 else 0.0
        savings_rate = _clamp(savings_rate, -10.0, 10.0) 

        raw_by_cat = bundle.get("expenses_by_category") or []
        by_cat_clean: List[Dict[str, Any]] = []
        for row in raw_by_cat:
            cat = (row.get("category") or row.get("name") or "Uncategorized")
            amt = _to_float(row.get("amount"), 0.0)
            if amt <= 0:
                continue
            by_cat_clean.append({"category": str(cat), "amount": amt})

        by_cat_clean.sort(key=lambda x: x["amount"], reverse=True)
        top_categories = by_cat_clean[: self.config.top_categories_limit]

        monthly_series = bundle.get("monthly_series") or []
        series_clean: List[Dict[str, Any]] = []
        if self.config.include_monthly_series:
            for item in monthly_series:
                m = item.get("month")
                if not m:
                    continue
                m = str(m)
                inc = _to_float(item.get("income"), 0.0)
                exp = _to_float(item.get("expenses"), 0.0)
                series_clean.append({"month": m, "income": inc, "expenses": exp, "net": inc - exp})
            series_clean.sort(key=lambda x: x["month"])

        top_expenses_clean: List[Dict[str, Any]] = []
        if self.config.include_top_expenses:
            raw_top = bundle.get("top_expenses") or []
            for tx in raw_top[: self.config.top_expenses_limit]:
                amt = _to_float(tx.get("amount"), 0.0)
                if amt <= 0:
                    continue
                top_expenses_clean.append(
                    {
                        "amount": amt,
                        "category": str(tx.get("category") or tx.get("category_name") or "Uncategorized"),
                        **({"date": str(tx["date"])} if tx.get("date") else {}),
                    }
                )

        payload: Dict[str, Any] = {
            "user_id": user_id, 
            "period": {
                "start_month": start_month,
                "end_month": end_month,
                "start_date": str(start_date),
                "end_date": str(end_date),
                "label": _period_label(start_month, end_month),
            },
            "totals": {
                "income": income,
                "expenses": expenses,
                "net": net,
                "savings": net, 
                "savings_rate": savings_rate,
                "transactions": int(totals.get("transactions") or 0),
            },
            "top_spending_categories": top_categories,
        }

        if self.config.include_monthly_series:
            payload["monthly_series"] = series_clean

        if self.config.include_top_expenses:
            payload["top_expenses"] = top_expenses_clean

        payload["signals"] = {
            "has_income": income > 0,
            "is_saving": net > 0,
            "is_deficit": net < 0,
            "primary_category": top_categories[0]["category"] if top_categories else None,
        }

        return payload

class AIInsightService:
    def __init__(self, session: Session):
        self.session = session
        self.cache_repo = AICacheRepository(session)
        self.summary_service = AISummaryService(session)
        self.advisor = AIAdvisorService()

    def get_or_generate(self, *, user_id: int, start_month: str, end_month: str) -> Dict[str, Any]:
        cached = self.cache_repo.get_insight(
            user_id=user_id,
            start_month=start_month,
            end_month=end_month,
        )

        if cached:
            return {
                "summary": json.loads(cached.summary_json),
                "insight": cached.insight_text,
                "cached": True,
            }

        summary = self.summary_service.build(
            user_id=user_id,
            start_month=start_month,
            end_month=end_month,
        )

        insight_text = self.advisor.generate_insight(summary)

        row = AIInsight(
            user_id=user_id,
            start_month=start_month,
            end_month=end_month,
            summary_json=json.dumps(summary),
            insight_text=insight_text,
            model="gpt-4o-mini",
        )
        self.cache_repo.save_insight(insight=row)

        return {
            "summary": summary,
            "insight": insight_text,
            "cached": False,
        }