# Personal Finance Tracker (MVP)

Backend for a personal finance tracking app.
Built with FastAPI, SQLModel, PostgreSQL, Alembic.

## Tech stack
- FastAPI
- SQLModel
- PostgreSQL (Docker)
- Alembic

## Run locally
```bash
cd backend
docker compose up -d
uvicorn app.main:app --reload
