import { useState } from "react";
import axios from "axios";
import "../App.css";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function AddEmployee({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    base_salary: "",
    bonus: "",
    deductions: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/employees/`, {
        name: form.name,
        base_salary: Number(form.base_salary) || 0,
        bonus: Number(form.bonus) || 0,
        deductions: Number(form.deductions) || 0,
      });
      if (onSuccess) onSuccess();
      setForm({ name: "", base_salary: "", bonus: "", deductions: "" });
      alert("Employee added successfully");
    } catch (err) {
      console.error(err);
      alert("Error adding employee");
    }
  };

  return (
    <div className="card form-card">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="emp-name">Name</label>
          <input
            id="emp-name"
            className="form-input"
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="emp-base">Base Salary (₹)</label>
          <input
            id="emp-base"
            className="form-input"
            type="number"
            name="base_salary"
            placeholder="0"
            value={form.base_salary}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="emp-bonus">Bonus (₹)</label>
          <input
            id="emp-bonus"
            className="form-input"
            type="number"
            name="bonus"
            placeholder="0"
            value={form.bonus}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="emp-deductions">Deductions (₹)</label>
          <input
            id="emp-deductions"
            className="form-input"
            type="number"
            name="deductions"
            placeholder="0"
            value={form.deductions}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Employee
        </button>
      </form>
    </div>
  );
}
