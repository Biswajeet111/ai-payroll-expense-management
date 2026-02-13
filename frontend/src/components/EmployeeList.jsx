import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://ai-payroll-expense-management.onrender.com";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = () => {
    axios.get(`${BASE_URL}/employees/`)
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/employees/${id}`);
      fetchEmployees(); // refresh list
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <div className="card" style={{ marginTop: "20px" }}>
      <h3>Employees</h3>

      {employees.map(emp => (
        <div key={emp.id} style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px"
        }}>
          <span>
            {emp.name} — ₹ {emp.base_salary}
          </span>

          <button onClick={() => deleteEmployee(emp.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
