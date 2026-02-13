import { useState } from "react";
import axios from "axios";

const BASE_URL = "https://ai-payroll-expense-management.onrender.com";

export default function AddExpense() {

  const [form, setForm] = useState({
    title: "",
    amount: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/expenses/`, {
        title: form.title,
        amount: Number(form.amount) || 0
      });

      console.log("Expense Added:", response.data);

      alert("Expense added successfully");
      setForm({ title: "", amount: "" });

    } catch (err) {
      console.error("Expense error:", err);
      alert("Error adding expense");
    }
  };

  return (
    <div className="card">
      <h3>Add Expense</h3>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}
