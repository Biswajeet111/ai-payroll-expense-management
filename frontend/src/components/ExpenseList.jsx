import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;


export default function ExpenseList() {

  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = () => {
    axios.get(`${BASE_URL}/expenses/`)
      .then(res => setExpenses(res.data))
      .catch(err => console.error("Expense fetch error:", err));
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/expenses/${id}`);
      fetchExpenses(); // refresh after delete
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete failed");
    }
  };

  return (
    <div className="card">
      <h3>Expenses</h3>

      {expenses.length === 0 && <p>No expenses found</p>}

      {expenses.map(exp => (
        <div
          key={exp.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px"
          }}
        >
          <span>
            {exp.title} — ₹ {exp.amount}
          </span>

          <button
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "5px 10px"
            }}
            onClick={() => deleteExpense(exp.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
