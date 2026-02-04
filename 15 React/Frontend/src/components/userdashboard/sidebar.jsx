// src/components/dashboard/Sidebar.jsx
const Sidebar = () => {
  return (
    <div className="w-64 bg-primary text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-8">User Panel</h2>

      <ul className="space-y-4">
        <li className="hover:bg-secondary p-2 rounded cursor-pointer">
          Dashboard
        </li>
        <li className="hover:bg-secondary p-2 rounded cursor-pointer">
          My Profile
        </li>
        <li className="hover:bg-secondary p-2 rounded cursor-pointer">
          Complaint
        </li>
        <li className="hover:bg-secondary p-2 rounded cursor-pointer">
          Settings
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
