from sqlalchemy import Column, Integer, String, Date
from datetime import date
from database import Base   

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    base_salary = Column(Integer)
    bonus = Column(Integer)
    deductions = Column(Integer)


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    amount = Column(Integer)
    category = Column(String)
    date = Column(Date, default=date.today)
