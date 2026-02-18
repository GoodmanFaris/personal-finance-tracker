from sqlmodel import Session
from app.repositories.summary import SummaryRepository
from app.core.formating import month_to_date_range

class SummaryService:
    def __init__(self, session: Session):
        self.session = session
        self.repository = SummaryRepository(session)

    # helpers
    def _months_to_dates(self, start_month: str, end_month: str):
        start_date, _ = month_to_date_range(start_month)  # first day
        _, end_date = month_to_date_range(end_month)      # last day
        return start_date, end_date

    # ✅ KPI totals
    def get_total_income(self, *, user_id: int, start_month: str, end_month: str):
        return self.repository.get_total_income(
            user_id=user_id,
            start_month=start_month,
            end_month=end_month
        )

    def get_total_expenses(self, *, user_id: int, start_month: str, end_month: str):
        start_date, end_date = self._months_to_dates(start_month, end_month)
        return self.repository.get_total_expenses(
            user_id=user_id,
            start_date=start_date,
            end_date=end_date
        )

    def get_total_transactions(self, *, user_id: int, start_month: str, end_month: str):
        start_date, end_date = self._months_to_dates(start_month, end_month)
        return self.repository.get_total_transactions(
            user_id=user_id,
            start_date=start_date,
            end_date=end_date
        )

    # ✅ Lists / breakdown
    def get_transactions_by_range(self, *, user_id: int, start_month: str, end_month: str):
        start_date, end_date = self._months_to_dates(start_month, end_month)
        return self.repository.get_transactions_by_date_range(
            user_id=user_id,
            start_date=start_date,
            end_date=end_date
        )

    def get_expenses_by_category(self, *, user_id: int, start_month: str, end_month: str):
        start_date, end_date = self._months_to_dates(start_month, end_month)
        return self.repository.get_expenses_by_category(
            user_id=user_id,
            start_date=start_date,
            end_date=end_date
        )

    # ✅ Trends
    def get_expenses_by_month(self, *, user_id: int, start_month: str, end_month: str):
        # ako u repo već grupiše po mjesecu iz Transaction.date -> ok
        start_date, end_date = self._months_to_dates(start_month, end_month)
        return self.repository.get_expenses_by_month(
            user_id=user_id,
            start_date=start_date,
            end_date=end_date
        )

    def get_income_by_month(self, *, user_id: int, start_month: str, end_month: str):
        return self.repository.get_income_by_month(
            user_id=user_id,
            start_month=start_month,
            end_month=end_month
        )

    def get_monthly_series(self, *, user_id: int, start_month: str, end_month: str):
        """
        returns list: [{month, income, expenses, net}]
        """
        income = self.get_income_by_month(user_id=user_id, start_month=start_month, end_month=end_month)
        expenses = self.get_expenses_by_month(user_id=user_id, start_month=start_month, end_month=end_month)

        # pretvori u map po mjesecu radi spajanja
        inc_map = {x["month"]: float(x["amount"]) for x in income}
        exp_map = {x["month"]: float(x["amount"]) for x in expenses}

        # napravi listu mjeseci od start do end (najjednostavnije: oslanjaj se na ono što imaš)
        months = sorted(set(list(inc_map.keys()) + list(exp_map.keys())))
        items = []
        for m in months:
            inc = inc_map.get(m, 0.0)
            exp = exp_map.get(m, 0.0)
            items.append({"month": m, "income": inc, "expenses": exp, "net": inc - exp})
        return items

    # ✅ Top spend
    def get_top_expenses(self, *, user_id: int, start_month: str, end_month: str, limit: int = 10):
        start_date, end_date = self._months_to_dates(start_month, end_month)
        return self.repository.get_top_expenses(
            user_id=user_id,
            start_date=start_date,
            end_date=end_date,
            limit=limit
        )

    # ✅ One-call bundle for frontend
    def get_summary_bundle(self, *, user_id: int, start_month: str, end_month: str, top_n: int = 10):
        total_income = self.get_total_income(user_id=user_id, start_month=start_month, end_month=end_month) or 0
        total_expenses = self.get_total_expenses(user_id=user_id, start_month=start_month, end_month=end_month) or 0
        total_transactions = self.get_total_transactions(user_id=user_id, start_month=start_month, end_month=end_month) or 0

        by_category = self.get_expenses_by_category(user_id=user_id, start_month=start_month, end_month=end_month)
        monthly_series = self.get_monthly_series(user_id=user_id, start_month=start_month, end_month=end_month)
        top_expenses = self.get_top_expenses(user_id=user_id, start_month=start_month, end_month=end_month, limit=top_n)

        return {
            "range": {"start_month": start_month, "end_month": end_month},
            "totals": {
                "income": float(total_income),
                "expenses": float(total_expenses),
                "net": float(total_income) - float(total_expenses),
                "transactions": int(total_transactions),
            },
            "expenses_by_category": by_category,
            "monthly_series": monthly_series,
            "top_expenses": top_expenses,
        }
