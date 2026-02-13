from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import engine, SessionLocal
from models import Base, Employee, Expense
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from fastapi import HTTPException

app = FastAPI()   

@app.get("/")
def root():
    return {"message": "AI Payroll API Running Successfully"}

# ✅ CORS Middleware AFTER app creation
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "https://ai-payroll-expense-management-flax.vercel.app"],

    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    new_emp = Employee(**emp.dict())
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
    if db_emp:
        db_emp.name = emp.name
        db_emp.base_salary = emp.base_salary
        db_emp.bonus = emp.bonus
        db_emp.deductions = emp.deductions
        db.commit()
        return {"message": "Employee updated"}
    return {"error": "Employee not found"}


@app.delete("/employees/{emp_id}")
def delete_employee(emp_id: int, db: Session = Depends(get_db)):
    emp = db.query(Employee).filter(Employee.id == emp_id).first()
    if emp:
        db.delete(emp)
        db.commit()
        return {"message": "Employee deleted"}
    return {"error": "Employee not found"}


@app.post("/expenses/")
def create_expense(exp: ExpenseCreate, db: Session = Depends(get_db)):
    new_exp = Expense(**exp.dict())
    db.add(new_exp)
    db.commit()
    db.refresh(new_exp)
    return new_exp


@app.get("/expenses/")
def get_expenses(db: Session = Depends(get_db)):
    return db.query(Expense).all()


@app.delete("/expenses/{exp_id}")
def delete_expense(exp_id: int, db: Session = Depends(get_db)):
    exp = db.query(Expense).filter(Expense.id == exp_id).first()
    if exp:
        db.delete(exp)
        db.commit()
        return {"message": "Expense deleted"}
    return {"error": "Expense not found"}


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
