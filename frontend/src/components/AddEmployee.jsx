import { useState } from "react";
import axios from "axios";

const BASE_URL = "https://ai-payroll-expense-management.onrender.com";

export default function AddEmployee() {

  const [form, setForm] = useState({
    name: "",
    base_salary: "",
    bonus: "",
    deductions: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/employees/`, {
        name: form.name,
        base_salary: Number(form.base_salary) || 0,
        bonus: Number(form.bonus) || 0,
        deductions: Number(form.deductions) || 0
      });

      console.log("Success:", response.data);

      alert("Employee added successfully");
      setForm({ name: "", base_salary: "", bonus: "", deductions: "" });

    } catch (error) {
      console.error("Add employee error:", error);
      alert("Error adding employee");
    }
  };

  return (
    <div className="card" style={{ marginTop: "20px" }}>
      <h3>Add Employee</h3>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="number"
          name="base_salary"
          placeholder="Base Salary"
          value={form.base_salary}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="number"
          name="bonus"
          placeholder="Bonus"
          value={form.bonus}
          onChange={handleChange}
        /><br /><br />

        <input
          type="number"
          name="deductions"
          placeholder="Deductions"
          value={form.deductions}
          onChange={handleChange}
        /><br /><br />

        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
}
