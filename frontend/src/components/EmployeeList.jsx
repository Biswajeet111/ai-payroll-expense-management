import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;


export default function EmployeeList() {

  const [employees, setEmployees] = useState([]);

  const fetchEmployees = () => {
    axios.get(`${BASE_URL}/employees/`)
      .then(res => setEmployees(res.data))
      .catch(err => console.error("Employee fetch error:", err));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/employees/${id}`);
      fetchEmployees(); // refresh after delete
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete failed");
    }
  };

  return (
    <div className="card" style={{ marginTop: "20px" }}>
      <h3>Employees</h3>

      {employees.length === 0 && <p>No employees found</p>}

      {employees.map(emp => (
        <div
          key={emp.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px"
          }}
        >
          <span>
            {emp.name} — ₹ {emp.base_salary}
          </span>

          <button
            style={{ background: "red", color: "white", border: "none", padding: "5px 10px" }}
            onClick={() => deleteEmployee(emp.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
