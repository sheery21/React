// src/components/adminDashboard/AdminNavbar.jsx
const AdminNavbar = () => {
  return (
    <div className="flex justify-between items-center bg-white shadow px-6 py-4">
      <h1 className="text-xl font-semibold text-primary">Admin Dashboard</h1>

      <button className="bg-red-500 text-white px-4 py-2 rounded hover:opacity-90 transition">
        Logout
      </button>
    </div>
  );
};

export default AdminNavbar;
