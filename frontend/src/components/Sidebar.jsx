import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "◉" },
  { id: "addMember", label: "Add Member", icon: "＋" },
  { id: "employeeList", label: "Employee List", icon: "☰" },
  { id: "addExpense", label: "Add Expense", icon: "₹" },
  { id: "expenseList", label: "Expense List", icon: "≡" },
];

export default function Sidebar({ page, setPage }) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    axios.get(`${BASE_URL}/dashboard-summary/`).then((res) => setBalance(res.data.net_balance)).catch((err) => console.error(err));
  }, []);

  return (
    <aside className="sidebar">
      <div>
        <h2 className="sidebar-logo">AI Payroll</h2>

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
