import re

_MONTH_RE = re.compile(r"^\d{4}-(0[1-9]|1[0-2])$")  # YYYY-MM

def validate_month(month: str) -> str:
    if not _MONTH_RE.match(month):
        raise ValueError("month must be in format YYYY-MM (e.g. 2026-01)")
    return month

