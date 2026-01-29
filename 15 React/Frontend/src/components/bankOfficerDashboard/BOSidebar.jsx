// src/components/bankOfficerDashboard/BOSidebar.jsx
const BOSidebar = () => {
  return (
    <div className="w-64 bg-primary text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-8">Bank Officer</h2>

      <ul className="space-y-4">
        <li className="hover:bg-secondary p-2 rounded cursor-pointer">
          Dashboard
        </li>
        <li className="hover:bg-secondary p-2 rounded cursor-pointer">
          User Requests
        </li>
        <li className="hover:bg-secondary p-2 rounded cursor-pointer">
          Approvals
        </li>
        <li className="hover:bg-secondary p-2 rounded cursor-pointer">
          Reports
        </li>
        <li className="hover:bg-secondary p-2 rounded cursor-pointer">
          Settings
        </li>
      </ul>
    </div>
  );
};

export default BOSidebar;
