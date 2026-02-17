import os
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import engine, SessionLocal
from models import Base, Employee, Expense
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from collections import defaultdict

app = FastAPI()

# CORS - support env for production
_cors_origins = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:5173,https://ai-payroll-expense-management-flax.vercel.app"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in _cors_origins if o.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "AI Payroll API Running Successfully"}

# Create tables
@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

# Schemas
class EmployeeCreate(BaseModel):
    name: str
    base_salary: int
    bonus: int
    deductions: int

class ExpenseCreate(BaseModel):
    title: str
    amount: int
    category: Optional[str] = "General"

# DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------------- CRUD APIs ----------------

@app.post("/employees/")
def create_employee(emp: EmployeeCreate, db: Session = Depends(get_db)):
    new_emp = Employee(**emp.model_dump())
    db.add(new_emp)
    db.commit()
    db.refresh(new_emp)
    return new_emp


@app.get("/employees/")
def get_employees(db: Session = Depends(get_db)):
    return db.query(Employee).all()


@app.put("/employees/{emp_id}")
def update_employee(emp_id: int, emp: EmployeeCreate, db: Session = Depends(get_db)):
    db_emp = db.query(Employee).filter(Employee.id == emp_id).first()
    if not db_emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    db_emp.name = emp.name
    db_emp.base_salary = emp.base_salary
    db_emp.bonus = emp.bonus
    db_emp.deductions = emp.deductions
    db.commit()
    return {"message": "Employee updated"}


@app.delete("/employees/{emp_id}")
def delete_employee(emp_id: int, db: Session = Depends(get_db)):
    emp = db.query(Employee).filter(Employee.id == emp_id).first()
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    db.delete(emp)
    db.commit()
    return {"message": "Employee deleted"}


class ExpenseUpdate(BaseModel):
    title: Optional[str] = None
    amount: Optional[int] = None
    category: Optional[str] = None


@app.post("/expenses/")
def create_expense(exp: ExpenseCreate, db: Session = Depends(get_db)):
    new_exp = Expense(**exp.model_dump())
    db.add(new_exp)
    db.commit()
    db.refresh(new_exp)
    return new_exp


@app.get("/expenses/")
def get_expenses(db: Session = Depends(get_db)):
    return db.query(Expense).all()


@app.put("/expenses/{exp_id}")
def update_expense(exp_id: int, exp: ExpenseUpdate, db: Session = Depends(get_db)):
    db_exp = db.query(Expense).filter(Expense.id == exp_id).first()
    if not db_exp:
        raise HTTPException(status_code=404, detail="Expense not found")
    if exp.title is not None:
        db_exp.title = exp.title
    if exp.amount is not None:
        db_exp.amount = exp.amount
    if exp.category is not None:
        db_exp.category = exp.category
    db.commit()
    db.refresh(db_exp)
    return db_exp


@app.delete("/expenses/{exp_id}")
def delete_expense(exp_id: int, db: Session = Depends(get_db)):
    exp = db.query(Expense).filter(Expense.id == exp_id).first()
    if not exp:
        raise HTTPException(status_code=404, detail="Expense not found")
    db.delete(exp)
    db.commit()
    return {"message": "Expense deleted"}


@app.get("/dashboard-summary/")
def dashboard_summary(db: Session = Depends(get_db)):
    employees = db.query(Employee).all()
    expenses = db.query(Expense).all()

    total_payroll = sum(
        (e.base_salary + e.bonus - e.deductions) for e in employees
    )

    total_expenses = sum(exp.amount for exp in expenses)

    return {
        "total_payroll": total_payroll,
        "total_expenses": total_expenses,
        "net_balance": total_payroll - total_expenses
    }
@app.get("/financial-health/")
def financial_health(db: Session = Depends(get_db)):
    employees = db.query(Employee).all()
    expenses = db.query(Expense).all()

    total_payroll = sum(
        (e.base_salary + e.bonus - e.deductions) for e in employees
    )

    total_expenses = sum(exp.amount for exp in expenses)

    net_balance = total_payroll - total_expenses

    if total_payroll == 0:
        score = 0
    else:
        score = round((net_balance / total_payroll) * 100)

    if score > 70:
        status = "Healthy"
    elif score > 40:
        status = "Moderate"
    else:
        status = "Risky"

    return {
        "financial_health_score": score,
        "status": status
    }
@app.get("/burn-rate-alert/")
def burn_rate_alert(db: Session = Depends(get_db)):
    employees = db.query(Employee).all()
    expenses = db.query(Expense).all()

    total_payroll = sum(
        (e.base_salary + e.bonus - e.deductions) for e in employees
    )

    total_expenses = sum(exp.amount for exp in expenses)

    if total_payroll == 0:
        return {
            "burn_rate_percentage": 0,
            "alert": "No payroll data available"
        }

    burn_rate = round((total_expenses / total_payroll) * 100)

    if burn_rate > 70:
        alert = "High Risk: Expenses are very high compared to payroll"
    elif burn_rate > 40:
        alert = "Moderate: Monitor expense growth"
    else:
        alert = "Stable: Financial condition under control"

    return {
        "burn_rate_percentage": burn_rate,
        "alert": alert
    }

@app.get("/expense-anomalies/")
def detect_anomalies(db: Session = Depends(get_db)):
    expenses = db.query(Expense).all()

    if not expenses:
        return {"anomalies": []}

    amounts = [exp.amount for exp in expenses]
    avg = sum(amounts) / len(amounts)

    threshold = avg * 1.5  # 50% above average

    anomalies = [
        {
            "title": exp.title,
            "amount": exp.amount
        }
        for exp in expenses if exp.amount > threshold
    ]

    return {
        "average_expense": avg,
        "anomalies": anomalies
    }

@app.get("/monthly-report/")
def monthly_report(db: Session = Depends(get_db)):
    expenses = db.query(Expense).all()

    report = defaultdict(int)

    for exp in expenses:
        month = exp.date.strftime("%Y-%m")
        report[month] += exp.amount

    return dict(report)

@app.get("/cashflow-prediction/")
def predict_cashflow(db: Session = Depends(get_db)):
    employees = db.query(Employee).all()
    expenses = db.query(Expense).all()

    total_payroll = sum(
        (e.base_salary + e.bonus - e.deductions)
        for e in employees
    )

    total_expenses = sum(exp.amount for exp in expenses)

    net = total_payroll - total_expenses

    # Simple projection for next month
    predicted_next_month = net - (total_expenses * 0.1)

    return {
        "current_net": net,
        "predicted_next_month_balance": predicted_next_month
    }

BUDGET_LIMIT = int(os.getenv("BUDGET_LIMIT", "100000"))

@app.get("/budget-alert/")
def budget_alert(db: Session = Depends(get_db)):
    expenses = db.query(Expense).all()
    total_expenses = sum(exp.amount for exp in expenses)

    if total_expenses > BUDGET_LIMIT:
        return {"alert": "Budget limit exceeded!"}

    return {"alert": "Within budget"}
