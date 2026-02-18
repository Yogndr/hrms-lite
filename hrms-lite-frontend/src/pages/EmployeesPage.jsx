import { useEffect, useState } from "react";
import API from "../api/axios";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await API.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      setError("Failed to fetch employees");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.employee_id || !form.full_name || !form.email || !form.department) {
    setError("Please fill in all fields");
    return;
  }
    try {
      await API.post("/employees", form);
      setForm({ employee_id: "", full_name: "", email: "", department: "" });
      setError(""); // Clear error
      fetchEmployees();
    } catch (err) {
      setError(err.response?.data?.detail || "Error adding employee");
    }
  };

  const deleteEmployee = async (id) => {
    await API.delete(`/employees/${id}`);
    fetchEmployees();
  };

  return (
    <div className="container">
      <h2>Employee Management</h2>
      {error && <div className="error">{error}</div>}

      <EmployeeForm form={form} setForm={setForm} handleSubmit={handleSubmit} />
      {loading && <p>Loading...</p>}
      <EmployeeList employees={employees} deleteEmployee={deleteEmployee} />
    </div>
  );
}

export default EmployeesPage;
