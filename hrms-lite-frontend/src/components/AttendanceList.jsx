export default function AttendanceList({ attendanceList }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {attendanceList.map((att) => (
          <tr key={att.id}>
            <td>{att.date}</td>
            <td>{att.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
