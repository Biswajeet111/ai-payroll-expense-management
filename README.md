🚀 AI Payroll & Expense Management System
An AI‑powered payroll and expense management platform built using FastAPI, PostgreSQL, and React.
The system provides intelligent financial insights, burn‑rate monitoring, and real‑time payroll tracking.

🌟 Features
👨‍💼 Employee Management
Add employees

View employee list

Delete employees

Automatic ID generation

Salary calculation (Base + Bonus − Deductions)

💸 Expense Management
Add expenses

View expense list

Delete expenses

Category‑based tracking

📊 Dashboard Analytics
Total Payroll Calculation

Total Expenses

Net Balance

Burn Rate Monitoring

Financial Health Score

🤖 AI Insights
Financial Health Scoring System

Burn Rate Risk Detection

Smart Financial Alerts

🛠️ Tech Stack
Backend
FastAPI

PostgreSQL

SQLAlchemy

Uvicorn

Deployed on Render

Frontend
React (Vite)

Axios

CSS Styling

Database
PostgreSQL (Hosted on Render)

🏗️ Project Architecture
ai-payroll-expense-management/
│
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── database.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/components/
│   └── src/pages/
│
└── README.md
🚀 Live Deployment
Backend (Render)
https://ai-payroll-expense-management.onrender.com
Swagger Docs:

/docs
⚙️ Backend Setup (Local)
1️⃣ Clone Repository
git clone https://github.com/your-username/ai-payroll-expense-management.git
cd ai-payroll-expense-management/backend
2️⃣ Create Virtual Environment
python -m venv venv
venv\Scripts\activate   # Windows
3️⃣ Install Dependencies
pip install -r requirements.txt
4️⃣ Run Server
uvicorn main:app --reload
Server runs on:

http://127.0.0.1:8000
⚙️ Frontend Setup
cd frontend
npm install
npm run dev
Make sure API base URL is updated to:

const BASE_URL = "https://ai-payroll-expense-management.onrender.com";
🧠 AI Logic Overview
Financial Health Score
health_score = (net_balance / total_payroll) * 100
Status:

70 → Healthy

40–70 → Moderate

<40 → Risky

Burn Rate Alert
burn_rate = (total_expenses / total_payroll) * 100
Alert Types:

70% → High Risk

40–70% → Monitor

<40% → Stable

📈 API Endpoints
Employees
POST /employees/

GET /employees/

PUT /employees/{id}

DELETE /employees/{id}

Expenses
POST /expenses/

GET /expenses/

DELETE /expenses/{id}

Analytics
GET /dashboard-summary/

GET /financial-health/

GET /burn-rate-alert/

🔒 Environment Variables
For deployment:

DATABASE_URL=your_postgresql_url
🎯 Hackathon Demo Flow
Add Employee

Add Expense

View Dashboard auto updates

Check Financial Health Score

Observe Burn Rate Alert

Delete employee → real‑time update

📌 Future Enhancements
Authentication System

Role‑based Access (Admin / Employee)

Expense Category AI Prediction

ML‑based Expense Forecasting

Real‑time Charts Integration

👨‍💻 Contributors
Biswajeet Kumar

Yash Raj

📜 License
This project is built for educational and hackathon purposes.