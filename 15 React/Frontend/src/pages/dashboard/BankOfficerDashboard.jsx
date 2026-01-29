import BONavbar from "../../components/bankOfficerDashboard/BONavbar";
import BOSidebar from "../../components/bankOfficerDashboard/BOSidebar";
import BOStatCard from "../../components/bankOfficerDashboard/BOStatCard";

const BankOfficerDashboard = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <BOSidebar />

      <div className="flex-1">
        <BONavbar />

        <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          <BOStatCard title="Pending Requests" value="18" />
          <BOStatCard title="Approved Today" value="7" />
          <BOStatCard title="Rejected" value="3" />
          <BOStatCard title="Total Users" value="1,245" />
        </div>

        <div className="p-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-primary mb-4">
              Recent Requests
            </h3>

            <table className="w-full text-left border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">User</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3">Ali Khan</td>
                  <td className="p-3">Account Opening</td>
                  <td className="p-3 text-yellow-500">Pending</td>
                  <td className="p-3">
                    <button className="bg-primary text-white px-3 py-1 rounded mr-2">
                      Approve
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded">
                      Reject
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankOfficerDashboard;
