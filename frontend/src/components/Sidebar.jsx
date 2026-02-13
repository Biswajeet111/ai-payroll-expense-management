import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://ai-payroll-expense-management.onrender.com";

export default function Sidebar({ setPage }) {

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    axios.get(`${BASE_URL}/dashboard-summary/`)
      .then(res => setBalance(res.data.net_balance))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="sidebar">
      <div>
        <h2 className="logoText">AI Payroll</h2>

        {/* Dynamic Balance Card */}
        <div className="balanceCard">
          <h3>₹ {balance}</h3>
          <small>Balance</small>
        </div>

        {/* Menu */}
        <ul className="menu">
          <li onClick={() => setPage("dashboard")}>🏠 Dashboard</li>
          <li onClick={() => setPage("addMember")}>➕ Add Member</li>
          <li onClick={() => setPage("employeeList")}>📋 Employee List</li>
          <li onClick={() => setPage("addExpense")}>💸 Add Expense</li>
          <li onClick={() => setPage("expenseList")}>📑 Expense List</li>
        </ul>
      </div>

      <div className="bottomMenu">
        <div>🚪 Log Out</div>
      </div>
    </div>
  );
}
