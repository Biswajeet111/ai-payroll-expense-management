import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;


export default function DashboardCards() {

  const [summary, setSummary] = useState({
    total_payroll: 0,
    total_expenses: 0,
    net_balance: 0
  });

  const fetchSummary = () => {
    axios.get(`${BASE_URL}/dashboard-summary/`)
      .then(res => setSummary(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  // ✅ Correct Burn Rate %
  const burnRate =
    summary.total_payroll === 0
      ? 0
      : Math.round((summary.total_expenses / summary.total_payroll) * 100);

  return (
    <div style={{
      display:"flex",
      gap:"20px",
      marginBottom:"20px",
      flexWrap:"wrap"
    }}>

      <div className="card">
        <h3>Total Expenses</h3>
        <p>₹ {summary.total_expenses}</p>
      </div>

      <div className="card">
        <h3>Total Payroll</h3>
        <p>₹ {summary.total_payroll}</p>
      </div>

      <div className="card">
        <h3>Net Balance</h3>
        <p>₹ {summary.net_balance}</p>
      </div>

      <div className="card">
        <h3>Burn Rate</h3>
        <p>{burnRate}%</p>
      </div>

    </div>
  );
}
