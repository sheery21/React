import { useDispatch, useSelector } from "react-redux";
import BONavbar from "../../components/bankOfficerDashboard/BONavbar";
import BOSidebar from "../../components/bankOfficerDashboard/BOSidebar";
import BOStatCard from "../../components/bankOfficerDashboard/BOStatCard";
import { useEffect } from "react";
import {
  getBankOfficerComplaints,
  updateComplaintStatus,
} from "../../store/features/complaint/bankOfficer.thunk";

const BankOfficerDashboard = () => {
  const dispatch = useDispatch();
  const { complaints } = useSelector((state) => state.bankOfficer);
  useEffect(() => {
    dispatch(getBankOfficerComplaints());
  }, [dispatch]);

  const handleUpdate = (id, status) => {
    dispatch(updateComplaintStatus({ Cid: id, status }));
  };

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
                  <th className="p-3">Complaint Type</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {complaints?.length > 0 ? (
                  complaints.map((comp) => (
                    <tr key={comp._id} className="border-t">
                      <td className="p-3">{comp.complaintType}</td>
                      <td className="p-3">{comp.category}</td>
                      <td className="p-3 capitalize">{comp.status}</td>
                      <td className="p-3">
                        <button
                          onClick={() => handleUpdate(comp._id, "approved")}
                          className="bg-primary text-white px-3 py-1 rounded mr-2"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => handleUpdate(comp._id, "rejected")}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-4">
                      No complaints found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankOfficerDashboard;
