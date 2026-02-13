from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import engine, SessionLocal
from models import Base, Employee, Expense 
from models import Base, Employee
from pydantic import BaseModel
from datetime import date

app = FastAPI()   
# Create tables
Base.metadata.create_all(bind=engine)

class EmployeeCreate(BaseModel):
    name: str
    base_salary: int
    bonus: int
    deductions: int

class ExpenseCreate(BaseModel):
    title: str
    amount: int
    category: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/employees/")
def create_employee(emp: EmployeeCreate, db: Session = Depends(get_db)):
    new_emp = Employee(**emp.dict())
    db.add(new_emp)
    db.commit()
    db.refresh(new_emp)
    return new_emp

@app.post("/expenses/")
def create_expense(exp: ExpenseCreate, db: Session = Depends(get_db)):
    new_exp = Expense(**exp.dict())
    db.add(new_exp)
    db.commit()
    db.refresh(new_exp)
    return new_exp


@app.get("/employees/")
def get_employees(db: Session = Depends(get_db)):
    return db.query(Employee).all()

@app.get("/expenses/")
def get_expenses(db: Session = Depends(get_db)):
    return db.query(Expense).all()

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
