import { useState } from "react";
import axios from "axios";

export default function AddEmployee() {

  const [form, setForm] = useState({
    name: "",
    base_salary: "",
    bonus: "",
    deductions: ""
  });

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://127.0.0.1:8000/employees/", {
        name: form.name,
        base_salary: Number(form.base_salary),
        bonus: Number(form.bonus),
        deductions: Number(form.deductions)
      });

      alert("Employee added successfully");
      setForm({ name:"", base_salary:"", bonus:"", deductions:"" });

    } catch (error) {
      console.error(error);
      alert("Error adding employee");
    }
  };

  return (
    <div className="card" style={{marginTop:"20px"}}>
      <h3>Add Employee</h3>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required /><br /><br />
        <input name="base_salary" placeholder="Base Salary" value={form.base_salary} onChange={handleChange} required /><br /><br />
        <input name="bonus" placeholder="Bonus" value={form.bonus} onChange={handleChange} required /><br /><br />
        <input name="deductions" placeholder="Deductions" value={form.deductions} onChange={handleChange} required /><br /><br />

        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
}
