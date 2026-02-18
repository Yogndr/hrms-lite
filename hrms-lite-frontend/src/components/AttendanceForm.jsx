export default function AttendanceForm({ employees, selectedEmployee, setSelectedEmployee, form, setForm, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)}>
        <option value="">Select Employee</option>
        {employees.map((emp) => (
          <option key={emp.id} value={emp.id}>{emp.full_name}</option>
        ))}
      </select>

      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        required
      />

      <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
        <option value="present">Present</option>
        <option value="absent">Absent</option>
        <option value="leave">Leave</option>
      </select>

      <button type="submit">Mark Attendance</button>
    </form>
  );
}
