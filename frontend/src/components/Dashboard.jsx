import Sidebar from "./Sidebar";
import AddEmployee from "./AddEmployee";
import EmployeeList from "./EmployeeList";
import AddExpense from "./AddExpense";
import ExpenseList from "./ExpenseList";
import ExpenseChart from "./ExpenseChart";
import AIInsights from "./AIInsights";


import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {

  const [page, setPage] = useState("dashboard");

  const [summary, setSummary] = useState({
    total_payroll: 0,
    total_expenses: 0,
    net_balance: 0
  });

const BASE_URL = import.meta.env.VITE_API_URL;


  const fetchSummary = () => {
    axios.get(`${BASE_URL}/dashboard-summary/`)
      .then(res => setSummary(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  // ✅ Proper Burn Rate %
  const burnRate =
    summary.total_payroll === 0
      ? 0
      : Math.round((summary.total_expenses / summary.total_payroll) * 100);

  return (
    <div style={{
      display: "flex",
      background: "#f5f6fa",
      minHeight: "100vh"
    }}>

      <Sidebar setPage={setPage} />

      <div style={{flex: 1, padding: "20px", color: "black"}}>

        {page === "dashboard" && (
          <>
            <h2>Dashboard</h2>

            <div style={{
              display: "flex",
              gap: "20px",
              marginTop: "20px",
              flexWrap: "wrap"
            }}>
              <div className="card">
                Total Expenses: ₹ {summary.total_expenses}
              </div>

              <div className="card">
                Total Payroll: ₹ {summary.total_payroll}
              </div>

              <div className="card">
                Net Balance: ₹ {summary.net_balance}
              </div>

              <div className="card">
                Burn Rate: {burnRate}%
              </div>
            </div>

            <div style={{
              display: "flex",
              gap: "20px",
              marginTop: "20px",
              flexWrap: "wrap"
            }}>
              <div className="card" style={{flex: "2 1 500px"}}>
              <h3>Expense Chart</h3>
              <ExpenseChart />
            </div>

            <div className="card" style={{flex: "1 1 300px"}}>
              <h3>AI Insights</h3>
              <AIInsights />
            </div>
            </div>
          </>
        )}

        {page === "addMember" && <AddEmployee />}
        {page === "employeeList" && <EmployeeList />}
        {page === "addExpense" && <AddExpense />}
        {page === "expenseList" && <ExpenseList />}

      </div>
    </div>
  );
}
