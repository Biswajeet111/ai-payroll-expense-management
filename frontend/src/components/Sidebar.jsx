import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "◇" },
  { id: "addMember", label: "Add Member", icon: "+" },
  { id: "employeeList", label: "Employee List", icon: "≡" },
  { id: "addExpense", label: "Add Expense", icon: "₹" },
  { id: "expenseList", label: "Expense List", icon: "▪" },
];

export default function Sidebar({ page, setPage, refreshKey }) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    axios.get(`${BASE_URL}/dashboard-summary/`).then((res) => setBalance(res.data.net_balance)).catch(() => {});
  }, [refreshKey ?? 0]);

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-logo-section">
          <h2 className="sidebar-logo">
            <span className="sidebar-logo-icon">₹</span>
            <span>AI Payroll</span>
          </h2>
        </div>

        <div className="sidebar-balance">
          <div className="sidebar-balance-value">₹ {balance?.toLocaleString?.() ?? balance}</div>
          <div className="sidebar-balance-label">Net Balance</div>
        </div>

        <ul className="sidebar-nav">
          {navItems.map((item) => (
            <li
              key={item.id}
              className={`sidebar-nav-item ${page === item.id ? "active" : ""}`}
              onClick={() => setPage(item.id)}
            >
              <span className="sidebar-nav-icon">{item.icon}</span>
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-footer-item">
          <span>⎋</span> Log out
        </div>
      </div>
    </aside>
  );
}
