import { Link, useLocation } from "react-router-dom";

// src/components/dashboard/Sidebar.jsx
const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="w-64 bg-primary text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-8">User Panel</h2>

      <ul className="space-y-4">
        <li
          className={`p-2 rounded cursor-pointer ${
            location.pathname === "/user-dashboard"
              ? "bg-secondary"
              : "hover:bg-secondary"
          }`}
        >
        <Link to="/user-dashboard">Dashboard</Link>
        </li>
        <li
          className={`p-2 rounded cursor-pointer ${
            location.pathname.includes("create-complaint")
              ? "bg-secondary"
              : "hover:bg-secondary"
          }`}
        >
          <Link to="/user-dashboard/create-complaint">Create Complaint</Link>
        </li>
        <li
          className={`p-2 rounded cursor-pointer ${
            location.pathname.includes("getAll-complaint")
              ? "bg-secondary"
              : "hover:bg-secondary"
          }`}
        >
          <Link to="/user-dashboard/getAll-complaint">My Complaints</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
