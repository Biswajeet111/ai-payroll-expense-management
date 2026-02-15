import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const BASE_URL = import.meta.env.VITE_API_URL;

function salary(emp) {
  return (emp.base_salary || 0) + (emp.bonus || 0) - (emp.deductions || 0);
}

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = () => {
    axios.get(`${BASE_URL}/employees/`).then((res) => setEmployees(res.data)).catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    if (!confirm("Remove this employee?")) return;
    try {
      await axios.delete(`${BASE_URL}/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="card list-card">
      <div className="list-header">
        <h3 style={{ margin: 0, fontSize: "1.1rem" }}>Employees</h3>
      </div>

      {employees.length === 0 && <div className="list-empty">No employees yet. Add one from the sidebar.</div>}

      {employees.map((emp) => (
        <div key={emp.id} className="list-item">
          <div>
            <div className="list-item-info">{emp.name}</div>
            <div className="list-item-meta">
              Base ₹{emp.base_salary?.toLocaleString?.() ?? emp.base_salary}
              {emp.bonus ? ` + ₹${emp.bonus} bonus` : ""}
              {emp.deductions ? ` − ₹${emp.deductions} deductions` : ""}
              → Net ₹{salary(emp)?.toLocaleString?.() ?? salary(emp)}
            </div>
          </div>
          <button className="btn btn-danger" onClick={() => deleteEmployee(emp.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
