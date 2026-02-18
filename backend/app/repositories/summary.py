from sqlmodel import Session, select, func, desc
from app.models.transaction import Transaction
from app.models.category import Category
from app.models.income import Income

class SummaryRepository:
    def __init__(self, session: Session):
        self.session = session

    # totals
    def get_total_income(self, *, user_id: int, start_month: str, end_month: str):
        stmt = (
            select(func.coalesce(func.sum(Income.amount), 0))
            .where(Income.user_id == user_id)
            .where(Income.month >= start_month)
            .where(Income.month <= end_month)
        )
        return self.session.exec(stmt).one()

    def get_total_expenses(self, *, user_id: int, start_date, end_date):
        stmt = (
            select(func.coalesce(func.sum(Transaction.amount), 0))
            .where(Transaction.user_id == user_id)
            .where(Transaction.date >= start_date)
            .where(Transaction.date <= end_date)
        )
        return self.session.exec(stmt).one()

    def get_total_transactions(self, *, user_id: int, start_date, end_date):
        stmt = (
            select(func.count(Transaction.id))
            .where(Transaction.user_id == user_id)
            .where(Transaction.date >= start_date)
            .where(Transaction.date <= end_date)
        )
        return self.session.exec(stmt).one()

    # list
    def get_transactions_by_date_range(self, *, user_id: int, start_date, end_date):
        stmt = (
            select(Transaction)
            .where(Transaction.user_id == user_id)
            .where(Transaction.date >= start_date)
            .where(Transaction.date <= end_date)
            .order_by(desc(Transaction.date))
        )
        return self.session.exec(stmt).all()

    # pie breakdown
    def get_expenses_by_category(self, *, user_id: int, start_date, end_date):
        stmt = (
            select(
                Category.id.label("category_id"),
                Category.name.label("category"),
                func.coalesce(func.sum(Transaction.amount), 0).label("amount"),
            )
            .join(Category, Category.id == Transaction.category_id)
            .where(Transaction.user_id == user_id)
            .where(Transaction.date >= start_date)
            .where(Transaction.date <= end_date)
            .group_by(Category.id, Category.name)
            .order_by(desc(func.sum(Transaction.amount)))
        )
        rows = self.session.exec(stmt).all()
        return [{"category_id": r.category_id, "category": r.category, "amount": float(r.amount)} for r in rows]

    # monthly trends (expenses)
    def get_expenses_by_month(self, *, user_id: int, start_date, end_date):
        # NOTE: ovo radi za Postgres: to_char(date, 'YYYY-MM')
        month_expr = func.to_char(Transaction.date, "YYYY-MM")
        stmt = (
            select(
                month_expr.label("month"),
                func.coalesce(func.sum(Transaction.amount), 0).label("amount"),
            )
            .where(Transaction.user_id == user_id)
            .where(Transaction.date >= start_date)
            .where(Transaction.date <= end_date)
            .group_by(month_expr)
            .order_by(month_expr)
        )
        rows = self.session.exec(stmt).all()
        return [{"month": r.month, "amount": float(r.amount)} for r in rows]

    # monthly trends (income)
    def get_income_by_month(self, *, user_id: int, start_month: str, end_month: str):
        stmt = (
            select(
                Income.month.label("month"),
                func.coalesce(func.sum(Income.amount), 0).label("amount"),
            )
            .where(Income.user_id == user_id)
            .where(Income.month >= start_month)
            .where(Income.month <= end_month)
            .group_by(Income.month)
            .order_by(Income.month)
        )
        rows = self.session.exec(stmt).all()
        return [{"month": r.month, "amount": float(r.amount)} for r in rows]

    # top expenses
    def get_top_expenses(self, *, user_id: int, start_date, end_date, limit: int):
        stmt = (
            select(
                Transaction.id,
                Transaction.date,
                Transaction.amount,
                Transaction.description,
                Category.name.label("category"),
            )
            .join(Category, Category.id == Transaction.category_id)
            .where(Transaction.user_id == user_id)
            .where(Transaction.date >= start_date)
            .where(Transaction.date <= end_date)
            .where(Transaction.type == "expense")
            .order_by(desc(Transaction.amount))
            .limit(limit)
        )
        rows = self.session.exec(stmt).all()
        out = []
        for (tid, tdate, amount, descp, catname) in rows:
            out.append({
                "id": tid,
                "date": tdate,
                "amount": float(amount),
                "description": descp,
                "category": catname,
            })
        return out
