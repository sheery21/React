import AdminNavbar from "../../components/adminDashboard/AdminNavbar";
import AdminSidebar from "../../components/adminDashboard/AdminSidebar";
import AdminStatCard from "../../components/adminDashboard/AdminStatCard";


const AdminDashboard = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <AdminSidebar />

      <div className="flex-1">
        <AdminNavbar />

        <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          <AdminStatCard title="Total Users" value="2,450" />
          <AdminStatCard title="Bank Officers" value="42" />
          <AdminStatCard title="Total Transactions" value="98,230" />
          <AdminStatCard title="System Alerts" value="5" />
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-primary mb-4">
              Recent Activities
            </h3>
            <ul className="space-y-3 text-sm">
              <li>✔ New user registered</li>
              <li>✔ Bank Officer approved</li>
              <li>⚠ System warning detected</li>
              <li>✔ Transaction completed</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-primary mb-4">
              Admin Actions
            </h3>

            <div className="space-y-3">
              <button className="w-full bg-primary text-white py-2 rounded hover:bg-secondary">
                Add Bank Officer
              </button>

              <button className="w-full bg-primary text-white py-2 rounded hover:bg-secondary">
                Manage Users
              </button>

              <button className="w-full bg-red-500 text-white py-2 rounded hover:opacity-90">
                System Maintenance
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
