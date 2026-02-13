💼 AI Payroll & Expense Management System
Intelligent Payroll Monitoring with Real‑Time Financial Insights

A full‑stack AI‑powered payroll and expense management platform built using FastAPI, PostgreSQL, and React.
The system provides automated salary calculations, financial analytics, and smart burn‑rate monitoring.

🚀 Live Demo

🔗 Backend API:

📘 Swagger Docs:
/docs

✨ Key Features
👨‍💼 Employee Management
Add Employees

View Employee List

Delete Employees

Auto ID Generation

Salary Calculation (Base + Bonus − Deductions)

💸 Expense Management
Add Expenses

Category Tracking

Expense Deletion

Real-Time Updates

📊 Smart Dashboard
Total Payroll

Total Expenses

Net Balance

Burn Rate Monitoring

🤖 AI Insights Engine
Financial Health Score

Burn Rate Risk Detection

Intelligent Status Alerts

🧠 AI Logic
🔹 Financial Health Score
Health Score = (Net Balance / Total Payroll) × 100
Score	Status
> 70	Healthy
40–70	Moderate
< 40	Risky
🔹 Burn Rate Detection
Burn Rate = (Total Expenses / Total Payroll) × 100
Burn Rate	Alert Level
< 40%	Stable
40–70%	Monitor
> 70%	High Risk
🏗️ Tech Stack
🔹 Backend
FastAPI

SQLAlchemy

PostgreSQL

Uvicorn

Render Deployment

🔹 Frontend
React

Axios

CSS

🔹 Database
PostgreSQL (Cloud Hosted)

📂 Project Structure
ai-payroll-expense-management/
│
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── database.py
│   └── requirements.txt
│
├── frontend/
│   └── src/
│
└── README.md
⚙️ Local Setup
Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
Runs at:

http://127.0.0.1:8000
Frontend
cd frontend
npm install
npm run dev
Make sure API base URL is:

const BASE_URL = "https://ai-payroll-expense-management.onrender.com";
🔐 Environment Variable (Production)
DATABASE_URL=your_render_postgres_url
🎯 Demo Flow (Hackathon Ready)
Add Employee

Add Expense

Dashboard Auto Updates

View AI Financial Health

Monitor Burn Rate Alert

Delete Employee → Live Refresh

🔮 Future Enhancements
Role‑Based Authentication

ML‑Based Expense Forecasting

Category Auto‑Prediction

Advanced Data Visualizations

PDF Salary Reports

👨‍💻 Developed By
Biswajeet Kumar
AI Payroll Team

📌 Project Type
Hackathon / Portfolio Project
Production‑Ready Deployment