AI Payroll & Expense Management
================================

Intelligent payroll and expense management with real‑time financial insights and AI‑driven analytics.

### Overview

AI Payroll is a full‑stack system for managing employee payroll and business expenses with:

- **Automated salary calculations** (base salary, bonus, deductions)
- **Real‑time financial analytics** (payroll, expenses, net balance)
- **Burn rate monitoring and alerts**
- **AI‑based financial health scoring and insights**
- **Anomaly detection, monthly reporting, and PDF export**

The stack is **FastAPI + SQLAlchemy + PostgreSQL** on the backend and **React + Vite** on the frontend, with deployment targeting platforms like Render.

### Features

- **Employee management**
  - Add employees with base salary, bonus, and deductions
  - View and delete employees
  - Automatic net salary calculation

- **Expense management**
  - Add expenses with categories
  - View and delete expenses
  - Real‑time updates reflected in dashboard metrics

- **Smart financial dashboard**
  - Total payroll
  - Total expenses
  - Net balance
  - Burn rate percentage
  - Category‑wise expense visualization

- **AI insights engine**
  - Financial health score and status
  - Burn rate risk classification (stable, monitor, high risk)
  - Expense anomaly detection (unusually high expenses)
  - Simple cashflow prediction for the next month
  - Budget limit alert endpoint

- **Reporting**
  - Download a complete financial report as a PDF from the dashboard
  - Includes summary metrics, AI insights, anomalies, and detailed expense list

### Architecture

- **Backend** (`backend/`)
  - FastAPI application (`main.py`)
  - SQLAlchemy models and PostgreSQL database
  - REST APIs for employees, expenses, dashboards, and AI insights

- **Frontend** (`frontend/`)
  - React + Vite SPA
  - Axios‑based API client
  - Responsive dashboard UI with charts and AI insights panel

### Tech Stack

- **Backend**
  - FastAPI
  - SQLAlchemy
  - PostgreSQL
  - Uvicorn

- **Frontend**
  - React
  - Vite
  - Axios
  - Recharts
  - jsPDF (PDF report generation)

### API Highlights

Key backend endpoints exposed by `main.py`:

- **Health and summary**
  - `GET /` – API health check
  - `GET /dashboard-summary/` – total payroll, total expenses, net balance

- **Employees**
  - `GET /employees/`
  - `POST /employees/`
  - `PUT /employees/{emp_id}`
  - `DELETE /employees/{emp_id}`

- **Expenses**
  - `GET /expenses/`
  - `POST /expenses/`
  - `PUT /expenses/{exp_id}`
  - `DELETE /expenses/{exp_id}`

- **AI insights**
  - `GET /financial-health/`
  - `GET /burn-rate-alert/`
  - `GET /expense-anomalies/`
  - `GET /monthly-report/`
  - `GET /cashflow-prediction/`
  - `GET /budget-alert/`

Interactive API documentation is available at `/docs` when the backend is running.

### Business Logic Summary

- **Financial health score**
  - Formula: \((\text{Net Balance} / \text{Total Payroll}) \times 100\)
  - Status:
    - `> 70` – Healthy
    - `40–70` – Moderate
    - `< 40` – Risky

- **Burn rate**
  - Formula: \((\text{Total Expenses} / \text{Total Payroll}) \times 100\)
  - Alerts:
    - `< 40%` – Stable
    - `40–70%` – Monitor
    - `> 70%` – High risk

### Local Development Setup

#### Prerequisites

- Python 3.10+
- Node.js 18+ and npm
- PostgreSQL instance

#### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

The API will be available at `http://127.0.0.1:8000`.

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

By default Vite runs at `http://localhost:5173`.

### Environment Configuration

#### Backend (`backend`)

Set at least:

- **`DATABASE_URL`** – PostgreSQL connection string compatible with SQLAlchemy (e.g. from Render).
- **`CORS_ORIGINS`** (optional) – comma‑separated list of allowed frontend origins, for example:
  - `http://localhost:5173,https://your-frontend-domain`

#### Frontend (`frontend/.env`)

- **`VITE_API_URL`** – base URL of the FastAPI backend, for example:
  - `http://127.0.0.1:8000` (local)
  - `https://ai-payroll-expense-management.onrender.com` (deployed)

The React app reads this value via `import.meta.env.VITE_API_URL`.

### Typical Usage Flow

1. Start backend and frontend locally.
2. Open the dashboard in the browser.
3. Add employees with salary components.
4. Add expenses under relevant categories.
5. Observe:
   - Dashboard cards (payroll, expenses, net balance, burn rate)
   - AI insights (financial health, burn rate alerts, anomalies, prediction)
6. Optionally download the consolidated PDF financial report from the dashboard.

### Author

- Biswajeet Kumar

