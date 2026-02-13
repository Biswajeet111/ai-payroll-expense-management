from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import engine, SessionLocal
from models import Base, Employee
from pydantic import BaseModel

app = FastAPI()   # ✅ SABSE UPAR DEFINE KARO

# Create tables
Base.metadata.create_all(bind=engine)

class EmployeeCreate(BaseModel):
    name: str
    base_salary: int
    bonus: int
    deductions: int

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

@app.get("/employees/")
def get_employees(db: Session = Depends(get_db)):
    return db.query(Employee).all()

