import { Outlet } from "react-router-dom";
import Navbar from "../../components/userdashboard/navbar";
import Sidebar from "../../components/userdashboard/sidebar";
import StatCard from "../../components/userdashboard/statcard";
import CreateComplaint from "../../components/complaints/createComplaint";

const UserDashboard = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Balance" value="Rs. 120,000" />
          <StatCard title="Transactions" value="34" />
          <StatCard title="Account Status" value="Active" />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
