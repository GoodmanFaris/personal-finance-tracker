from datetime import date
from app.core.validators import validate_month

def month_to_date_range(month: str) -> tuple[date, date]:
    validate_month(month)
    year, m = map(int, month.split("-"))
    start = date(year, m, 1)

    if m == 12:
        end = date(year + 1, 1, 1)
    else:
        end = date(year, m + 1, 1)

    return start, end
