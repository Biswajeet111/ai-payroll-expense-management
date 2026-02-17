import "../App.css";
import Sidebar from "./Sidebar";
import AddEmployee from "./AddEmployee";
import EmployeeList from "./EmployeeList";
import AddExpense from "./AddExpense";
import ExpenseList from "./ExpenseList";
import ExpenseChart from "./ExpenseChart";
import AIInsights from "./AIInsights";
import DownloadReport from "./DownloadReport";


import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [page, setPage] = useState("dashboard");
  const [refreshKey, setRefreshKey] = useState(0);

  const [summary, setSummary] = useState({
    total_payroll: 0,
    total_expenses: 0,
    net_balance: 0,
  });

  const BASE_URL = import.meta.env.VITE_API_URL;

  const fetchSummary = () => {
    axios.get(`${BASE_URL}/dashboard-summary/`).then((res) => setSummary(res.data)).catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchSummary();
  }, [refreshKey]);

  const burnRate =
    summary.total_payroll === 0 ? 0 : Math.round((summary.total_expenses / summary.total_payroll) * 100);

  const getBurnClass = () => {
    if (burnRate > 70) return "danger";
    if (burnRate > 40) return "warn";
    return "success";
  };

  const getBalanceClass = () => (summary.net_balance >= 0 ? "success" : "danger");

  const getBurnTrend = () => {
    if (burnRate > 70) return { class: "down", label: "High risk" };
    if (burnRate > 40) return { class: "neutral", label: "Monitor" };
    return { class: "up", label: "Healthy" };
  };

  const burnTrend = getBurnTrend();

  return (
    <div className="app-layout">
      <Sidebar page={page} setPage={setPage} refreshKey={refreshKey} />

      <div className="main-wrapper">
        <header className="top-nav">
          <div className="top-nav-left">
            <div>
              <h1 className="top-nav-title">
                {page === "dashboard" && "Financial Overview"}
                {page === "addMember" && "Add Member"}
                {page === "employeeList" && "Employee List"}
                {page === "addExpense" && "Add Expense"}
                {page === "expenseList" && "Expense List"}
              </h1>
              <div className="top-nav-subtitle">
                {page === "dashboard" ? "Real-time payroll & expense analytics" : "Manage your organization"}
              </div>
            </div>
            {page === "dashboard" && (
              <span className="top-nav-badge">Live</span>
            )}
          </div>
        </header>

        <main className="main-content">
          {page === "dashboard" && (
            <>
              <h1 className="page-title">Dashboard</h1>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-card-icon expenses">₹</div>
                  <div className="card-title">Total Expenses</div>
                  <div className="card-value">₹ {summary.total_expenses?.toLocaleString?.() ?? summary.total_expenses}</div>
                  <div className={`stat-card-trend neutral`}>All time</div>
                </div>
                <div className="stat-card">
                  <div className="stat-card-icon payroll">₹</div>
                  <div className="card-title">Total Payroll</div>
                  <div className="card-value">₹ {summary.total_payroll?.toLocaleString?.() ?? summary.total_payroll}</div>
                  <div className="stat-card-trend neutral">Monthly</div>
                </div>
                <div className="stat-card">
                  <div className={`stat-card-icon balance ${getBalanceClass()}`}>+</div>
                  <div className="card-title">Net Balance</div>
                  <div className={`card-value ${getBalanceClass()}`}>
                    ₹ {summary.net_balance?.toLocaleString?.() ?? summary.net_balance}
                  </div>
                  <div className={`stat-card-trend ${summary.net_balance >= 0 ? "up" : "down"}`}>
                    {summary.net_balance >= 0 ? "Surplus" : "Deficit"}
                  </div>
                </div>
                <div className="stat-card">
                  <div className={`stat-card-icon burn ${getBurnClass()}`}>%</div>
                  <div className="card-title">Burn Rate</div>
                  <div className={`card-value ${getBurnClass()}`}>{burnRate}%</div>
                  <div className={`stat-card-trend ${burnTrend.class}`}>{burnTrend.label}</div>
                </div>
              </div>

              <div className="dashboard-grid">
                <div className="card chart-card chart-wrap">
                  <h3 className="card-title" style={{ marginBottom: 16 }}>Expense breakdown</h3>
                  <ExpenseChart key={refreshKey} />
                </div>
                <div className="card">
                  <h3 className="card-title" style={{ marginBottom: 16, fontSize: "1rem", fontWeight: 700 }}>AI Insights</h3>
                  <AIInsights key={refreshKey} refreshKey={refreshKey} />
                  <DownloadReport key={refreshKey} />
                </div>
              </div>
          </>
        )}

        {page === "addMember" && (
          <>
            <h1 className="page-title">Add Member</h1>
            <AddEmployee onSuccess={() => setRefreshKey((prev) => prev + 1)} />
          </>
        )}

        {page === "employeeList" && (
          <>
            <h1 className="page-title">Employee List</h1>
            <EmployeeList onSuccess={() => setRefreshKey((k) => k + 1)} />
          </>
        )}

        {page === "addExpense" && (
          <>
            <h1 className="page-title">Add Expense</h1>
            <AddExpense onSuccess={() => setRefreshKey((prev) => prev + 1)} />
          </>
        )}

        {page === "expenseList" && (
          <>
            <h1 className="page-title">Expense List</h1>
            <ExpenseList onSuccess={() => setRefreshKey((k) => k + 1)} />
          </>
        )}
      </main>
      </div>
    </div>
  );
}
