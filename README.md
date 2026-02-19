# BudgetFlo

BudgetFlo is an open-source online personal finance tracker designed to help individuals manage their income, expenses, and financial insights through a clean and structured interface.

Live Website: https://budgetflo.online  
Current Version: v1


# Project Overview

BudgetFlo provides a secure and scalable platform where users can:

- Register and authenticate securely
- Track income and expenses
- Organize transactions by categories
- Monitor monthly balances
- Analyze financial behavior through visual summaries
- View historical data across custom date ranges
- Manage profile and account settings

The application focuses on simplicity, performance, and a production-ready architecture suitable for future scaling.


# Core Features (v1)

## Authentication

- Email and password authentication
- JWT-based secure sessions
- Protected backend routes
- User profile management

## Dashboard

- Monthly income overview
- Category-based expense tracking
- Real-time balance recalculation
- Full transaction CRUD operations
- Quick-add transaction functionality

## Summary & Analytics

- Custom month-to-month range selection
- Income vs Expenses bar chart
- Spending distribution pie charts
- Top expenses analysis
- Category history with transaction drill-down
- Aggregated financial insights

## Contact System

- Backend-powered contact form
- Email delivery via Resend API
- Secure server-side handling


# Tech Stack

## Frontend

- Next.js (App Router)
- JavaScript
- Tailwind CSS
- Axios
- Recharts (data visualization)
- Deployment: Vercel

## Backend

- FastAPI
- SQLModel
- PostgreSQL
- Alembic (database migrations)
- JWT Authentication
- Resend (email service integration)
- Deployment: Railway

## Database

- PostgreSQL
- Hosted on Neon


# Architecture

The backend follows a layered architecture:

routes → services → repositories

This structure ensures:

- Clear separation of concerns
- Scalable business logic
- Maintainability
- Easier testing and future expansion

Authentication uses dependency-based route protection (get_current_user) to enforce secure data access.


# Infrastructure

- Frontend hosted on Vercel
- Backend hosted on Railway
- Database hosted on Neon
- Environment variable-based configuration
- Docker used for local PostgreSQL development


# Local Development

## Backend Setup

1. Start PostgreSQL via Docker Compose
2. Run database migrations using Alembic
3. Start the FastAPI server

## Frontend Setup

1. Install dependencies
2. Configure .env.local
3. Run the Next.js development server


# Security

- Password hashing with bcrypt
- JWT-based authentication
- CORS configuration
- Environment-based secrets management
- Secure server-side email handling


# Roadmap

Planned improvements include:

- Refresh token implementation
- Advanced analytics and reports
- Savings goals tracking
- Recurring transactions
- CSV export functionality
- Improved mobile-first experience
- Multi-currency enhancements


# Contributing

BudgetFlo is open-source and contributions are welcome.

To contribute:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request


# Future Development

Version 2 (v2) will include:

- More advanced personalization options
- Google OAuth authentication integration
