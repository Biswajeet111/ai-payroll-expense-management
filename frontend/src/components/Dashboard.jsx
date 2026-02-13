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
  const [refreshKey, setRefreshKey] = useState(0);

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
  }, [refreshKey]); // auto refresh when key changes

  // ✅ Proper Burn Rate %
  const burnRate =
    summary.total_payroll === 0
      ? 0
      : Math.round((summary.total_expenses / summary.total_payroll) * 100);

  const getBurnColor = () => {
    if (burnRate > 70) return "red";
    if (burnRate > 40) return "orange";
    return "green";
  };

  const getBalanceColor = () => {
    return summary.net_balance >= 0 ? "green" : "red";
  };

  return (
    <div style={{
      display: "flex",
      background: "#f5f6fa",
      minHeight: "100vh"
    }}>

      <Sidebar setPage={setPage} />

      <div style={{ flex: 1, padding: "20px", color: "black" }}>

        {page === "dashboard" && (
          <>
            <h2>Dashboard</h2>

            {/* Summary Cards */}
            <div style={{
              display: "flex",
              gap: "20px",
              marginTop: "20px",
              flexWrap: "wrap"
            }}>

              <div className="card">
                <h4>Total Expenses</h4>
                <p>₹ {summary.total_expenses}</p>
              </div>

              <div className="card">
                <h4>Total Payroll</h4>
                <p>₹ {summary.total_payroll}</p>
              </div>

              <div className="card">
                <h4>Net Balance</h4>
                <p style={{ color: getBalanceColor(), fontWeight: "bold" }}>
                  ₹ {summary.net_balance}
                </p>
              </div>

              <div className="card">
                <h4>Burn Rate</h4>
                <p style={{ color: getBurnColor(), fontWeight: "bold" }}>
                  {burnRate}%
                </p>
              </div>
            </div>

            {/* Charts + AI */}
            <div style={{
              display: "flex",
              gap: "20px",
              marginTop: "20px",
              flexWrap: "wrap"
            }}>

              <div className="card" style={{ flex: "2 1 500px" }}>
                <h3>Expense Chart</h3>
                <ExpenseChart key={refreshKey} />
              </div>

              <div className="card" style={{ flex: "1 1 300px" }}>
                <h3>AI Insights</h3>
                <AIInsights key={refreshKey} />
              </div>

            </div>
          </>
        )}

        {page === "addMember" && 
          <AddEmployee onSuccess={() => setRefreshKey(prev => prev + 1)} />
        }

        {page === "employeeList" && 
          <EmployeeList onSuccess={() => setRefreshKey(prev => prev + 1)} />
        }

        {page === "addExpense" && 
          <AddExpense onSuccess={() => setRefreshKey(prev => prev + 1)} />
        }

        {page === "expenseList" && 
          <ExpenseList onSuccess={() => setRefreshKey(prev => prev + 1)} />
        }

      </div>
    </div>
  );
}
