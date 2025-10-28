import { NavLink, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <NavLink to="/dashboard" end>Home</NavLink>{" | "}
        <NavLink to="settings">Settings</NavLink>{" | "}
        <NavLink to="reports">Reports</NavLink>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
