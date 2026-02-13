import Sidebar from "./Sidebar";
import AddEmployee from "./AddEmployee";
import EmployeeList from "./EmployeeList";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {

  const [page, setPage] = useState("dashboard");   // 👈 page state

  const [summary, setSummary] = useState({
    total_payroll: 0,
    total_expenses: 0,
    net_balance: 0
  });

  const BASE_URL = "https://ai-payroll-expense-management.onrender.com";

useEffect(() => {
  axios.get(`${BASE_URL}/dashboard-summary/`)
    .then(res => setSummary(res.data))
    .catch(err => console.error(err));
}, []);



  const burnRate = summary.total_expenses;

  return (
    <div style={{
      display: "flex",
      background: "#f5f6fa",
      minHeight: "100vh"
    }}>

      {/* Sidebar ko function pass kar rahe */}
      <Sidebar setPage={setPage} />

      <div style={{flex: 1, padding: "20px", color: "black"}}>
        
        {/* Dashboard View */}
        {page === "dashboard" && (
          <>
            <h2>Dashboard</h2>

            <div style={{
              display: "flex",
              gap: "20px",
              marginTop: "20px",
              flexWrap: "wrap"
            }}>
              <div className="card">Total Expenses: ₹ {summary.total_expenses}</div>
              <div className="card">Total Payroll: ₹ {summary.total_payroll}</div>
              <div className="card">Net Balance: ₹ {summary.net_balance}</div>
              <div className="card">Burn Rate: ₹ {burnRate}</div>
            </div>

            <div style={{
              display: "flex",
              gap: "20px",
              marginTop: "20px",
              flexWrap: "wrap"
            }}>
              <div className="card" style={{flex: "2 1 500px", height:"250px"}}>
                Expense Chart (Coming Soon)
              </div>

              <div className="card" style={{flex: "1 1 300px", height:"250px"}}>
                AI Insights (Coming Soon)
              </div>
            </div>
          </>
        )}

        {/* Add Member View */}
        {page === "addMember" && (
          <>
            <h2>Add Member</h2>
            <AddEmployee />
          </>
        )}

        {/* Employee List View */}
        {page === "employeeList" && (
          <>
            <h2>Employee List</h2>
            <EmployeeList />
          </>
        )}

      </div>
    </div>
  );
}
