export default function EmployeeForm({ form, setForm, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Employee ID"
        value={form.employee_id}
        onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
      />
      <input
        placeholder="Full Name"
        value={form.full_name}
        onChange={(e) => setForm({ ...form, full_name: e.target.value })}
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Department"
        value={form.department}
        onChange={(e) => setForm({ ...form, department: e.target.value })}
      />
      <button type="submit">Add</button>
    </form>
  );
}
