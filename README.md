💼 AI Payroll & Expense Management
<p align="center"> Intelligent Payroll Monitoring with Real‑Time Financial Insights </p> <p align="center"> <img src="https://img.shields.io/badge/Backend-FastAPI-green"> <img src="https://img.shields.io/badge/Frontend-React-blue"> <img src="https://img.shields.io/badge/Database-PostgreSQL-orange"> <img src="https://img.shields.io/badge/Deployment-Render-purple"> </p>

## 🚀 Overview
AI Payroll is a full‑stack payroll and expense management system that provides:

Automated salary calculations

Real‑time financial analytics

Burn rate monitoring

AI‑based financial health scoring

Built using FastAPI + PostgreSQL + React and deployed on Render.

## 🔗 Live Links
Backend API:

Swagger Docs:
/docs

## ✨ Features

### 👨‍💼 Employee Management
Add Employees

View Employee List

Delete Employees

Auto ID Generation

Salary Calculation (Base + Bonus − Deductions)

### 💸 Expense Management
Add Expenses

Category Tracking

Expense Deletion

Real-Time Updates

### 📊 Smart Dashboard
Total Payroll

Total Expenses

Net Balance

Burn Rate Monitoring

## 🤖 AI Insights Engine
Financial Health Score

Burn Rate Risk Detection

Intelligent Status Alerts

## 🧠 AI Logic
Financial Health Score
Health Score = (Net Balance / Total Payroll) × 100
Score Range	Status
> 70	Healthy
40 – 70	Moderate
< 40	Risky
Burn Rate
Burn Rate = (Total Expenses / Total Payroll) × 100
Burn Rate	Alert
< 40%	Stable
40–70%	Monitor
> 70%	High Risk


## 🏗️ Tech Stack
Backend
FastAPI

SQLAlchemy

PostgreSQL

Uvicorn

Frontend
React

Axios

CSS

Deployment
Render (Web Service + PostgreSQL)

## 📂 Project Structure
backend/
frontend/
README.md
⚙️ Local Setup
Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
Frontend
cd frontend
npm install
npm run dev
🔐 Environment Variable
DATABASE_URL=your_render_database_url
🎯 Hackathon Demo Flow
Add Employee

Add Expense

Dashboard updates automatically

Check AI Financial Health

Monitor Burn Rate

Delete employee → instant refresh

👨‍💻 Team
Biswajeet Kumar
AI Payroll Team