import Sidebar from "./Sidebar";
import AddEmployee from "./AddEmployee";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {

  const [summary, setSummary] = useState({
    total_payroll: 0,
    total_expenses: 0,
    net_balance: 0
  });

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/dashboard-summary/")
      .then(res => setSummary(res.data))
      .catch(err => console.error(err));
  }, []);

  // simple burn rate calculation (example)
  const burnRate = summary.total_expenses;

  return (
    <div style={{
      display: "flex",
      background: "#f5f6fa",
      minHeight: "100vh"
    }}>

      <Sidebar />

      <div style={{flex: 1, padding: "20px", color: "black"}}>
        <h2>Dashboard</h2>

        {/* Top Cards */}
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

        {/* Charts Section */}
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

        {/* Add Employee Form */}
        <div style={{marginTop:"20px"}}>
          <AddEmployee />
        </div>

      </div>
    </div>
  );
}
