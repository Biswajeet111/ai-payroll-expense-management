import { useState } from "react";
import axios from "axios";
import "../App.css";

const BASE_URL = import.meta.env.VITE_API_URL;

const CATEGORIES = ["General", "Travel", "Office", "Marketing", "Utilities", "Other"];

export default function AddExpense({ onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "General",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/expenses/`, {
        title: form.title,
        amount: Number(form.amount) || 0,
        category: form.category,
      });
      if (onSuccess) onSuccess();
      setForm({ title: "", amount: "", category: "General" });
      alert("Expense added successfully");
    } catch (err) {
      console.error(err);
      alert("Error adding expense");
    }
  };

  return (
    <div className="card form-card">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="exp-title">Title</label>
          <input
            id="exp-title"
            className="form-input"
            name="title"
            placeholder="Expense description"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="exp-amount">Amount (₹)</label>
          <input
            id="exp-amount"
            className="form-input"
            type="number"
            name="amount"
            placeholder="0"
            value={form.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="exp-category">Category</label>
          <select
            id="exp-category"
            className="form-input"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Expense
        </button>
      </form>
    </div>
  );
}
