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

def generate_month_range(start_month: str, end_month: str) -> list[str]:
    validate_month(start_month)
    validate_month(end_month)

    start_year, start_m = map(int, start_month.split("-"))
    end_year, end_m = map(int, end_month.split("-"))

    months = []
    current_year, current_m = start_year, start_m

    while (current_year < end_year) or (current_year == end_year and current_m <= end_m):
        months.append(f"{current_year:04d}-{current_m:02d}")
        if current_m == 12:
            current_m = 1
            current_year += 1
        else:
            current_m += 1

    return months
