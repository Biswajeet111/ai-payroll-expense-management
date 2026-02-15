import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = () => {
    axios.get(`${BASE_URL}/expenses/`).then((res) => setExpenses(res.data)).catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const deleteExpense = async (id) => {
    if (!confirm("Remove this expense?")) return;
    try {
      await axios.delete(`${BASE_URL}/expenses/${id}`);
      fetchExpenses();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const formatDate = (d) => {
    if (!d) return "—";
    try {
      return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    } catch {
      return d;
    }
  };

  return (
    <div className="card list-card">
      <div className="list-header">
        <h3 style={{ margin: 0, fontSize: "1.1rem" }}>Expenses</h3>
      </div>

      {expenses.length === 0 && <div className="list-empty">No expenses yet. Add one from the sidebar.</div>}

      {expenses.map((exp) => (
        <div key={exp.id} className="list-item">
          <div>
            <div className="list-item-info">{exp.title}</div>
            <div className="list-item-meta">
              {exp.category || "General"} · {formatDate(exp.date)}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontWeight: 600, color: "var(--text)" }}>₹ {exp.amount?.toLocaleString?.() ?? exp.amount}</span>
            <button className="btn btn-danger" onClick={() => deleteExpense(exp.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
