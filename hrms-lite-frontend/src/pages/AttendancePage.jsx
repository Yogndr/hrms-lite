import { useEffect, useState } from "react";
import API from "../api/axios";

function AttendancePage() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [attendanceList, setAttendanceList] = useState([]);
  const [form, setForm] = useState({ date: "", status: "present" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Fetch employees for dropdown
  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmployees(res.data);
    } catch {
      setError("Failed to load employees");
    }
  };

  // Fetch attendance for selected employee with optional filters
  const fetchAttendance = async (empId) => {
    if (!empId) return;
    setLoading(true);
    try {
      const params = {};
      if (startDate) params.start_date = startDate;
      if (endDate) params.end_date = endDate;

      const res = await API.get(`/attendance/${empId}`, { params });
      setAttendanceList(res.data);
      setError("");
    } catch {
      setAttendanceList([]);
      setError("No attendance records found for the selected range");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Refetch attendance whenever employee or filters change
  useEffect(() => {
    fetchAttendance(selectedEmployee);
  }, [selectedEmployee, startDate, endDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEmployee || !form.date) {
      setError("Please select employee and date");
      return;
    }

    try {
      await API.post("/attendance", {
        employee_id: parseInt(selectedEmployee),
        date: form.date,
        status: form.status,
      });
      setForm({ date: "", status: "present" });
      fetchAttendance(selectedEmployee);
    } catch (err) {
      setError(err.response?.data?.detail || "Error marking attendance");
    }
  };

  // Count total present days
  const totalPresent = attendanceList.filter(a => a.status === "present").length;

  return (
    <div className="container">
      <h2>Attendance Management</h2>

      {error && <div className="error">{error}</div>}
      {loading && <p>Loading...</p>}

      {/* Attendance Form */}
      <div style={{ marginBottom: "20px" }}>
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          <option value="">Select Employee</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>{emp.full_name}</option>
          ))}
        </select>

        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="present">Present</option>
          <option value="absent">Absent</option>
        </select>

        <button onClick={handleSubmit}>Mark Attendance</button>
      </div>

      {/* Date Filters */}
      {selectedEmployee && (
        <div style={{ marginBottom: "20px" }}>
          <h4>Filter Attendance</h4>
          <label>
            Start Date:{" "}
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
          </label>
          <label style={{ marginLeft: "15px" }}>
            End Date:{" "}
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
          </label>
          <button
            style={{ marginLeft: "15px" }}
            onClick={() => fetchAttendance(selectedEmployee)}
            disabled={!startDate && !endDate}
          >
            Apply Filter
          </button>
        </div>
      )}

      {/* Total Present Days */}
      {selectedEmployee && (
        <p><strong>Total Present Days:</strong> {totalPresent}</p>
      )}

      {/* Attendance Table */}
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceList.map(att => (
            <tr key={att.id}>
              <td>{new Date(att.date).toLocaleDateString()}</td>
              <td>{att.status.charAt(0).toUpperCase() + att.status.slice(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {!loading && selectedEmployee && attendanceList.length === 0 && (
        <p>No attendance records found.</p>
      )}
    </div>
  );
}

export default AttendancePage;
