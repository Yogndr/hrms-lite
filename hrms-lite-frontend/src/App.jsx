import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import EmployeesPage from "./pages/EmployeesPage";
import AttendancePage from "./pages/AttendancePage";

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: "20px" }}>
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/">Employees</Link> |{" "}
          <Link to="/attendance">Attendance</Link>
        </nav>

        <Routes>
          <Route path="/" element={<EmployeesPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
