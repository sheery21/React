import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllComplaintThunk } from "../../store/features/complaint/userComp.thunk";

const AllComplaint = () => {
  const dispatch = useDispatch();

  const { complaints, loading, error } = useSelector(
    (state) => state.complaint, // ✅ correct slice
  );

  useEffect(() => {
    dispatch(getAllComplaintThunk());
  }, [dispatch]);

  const sortedComplaints = useMemo(() => {
    const priorityOrder = {
      high: 1,
      medium: 2,
      low: 3,
    };
    return [...(complaints || [])].sort((a, b) => {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }, [complaints]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-primary mb-6">My Complaints</h2>

      {loading && (
        <div className="text-center text-gray-500">Loading complaints...</div>
      )}

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>
      )}

      {!loading && complaints?.length === 0 && (
        <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
          No Complaints Found
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedComplaints.map((comp) => (
          <div
            key={comp._id}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition space-y-3"
          >
            {/* Complaint Type */}
            <h3 className="text-lg font-bold text-primary">
              {comp.complaintType} - {comp.category}
            </h3>

            {/* Bank Name */}
            <p className="text-sm text-gray-500">
              🏦 Bank:{" "}
              <span className="font-medium">{comp.bankId?.bankName}</span>
            </p>

            {/* Description */}
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1">
                Description:
              </p>
              <p className="text-gray-600 text-sm">{comp.description}</p>
            </div>

            {/* Priority */}
            <div className="flex justify-between items-center mt-2">
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  comp.priority === "high"
                    ? "bg-red-100 text-red-600"
                    : comp.priority === "medium"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600"
                }`}
              >
                {comp.priority.toUpperCase()} Priority
              </span>

              {/* Status */}
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  comp.status === "pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : comp.status === "resolved"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-600"
                }`}
              >
                {comp.status.toUpperCase()}
              </span>
            </div>

            {/* Evidence Image */}
            {comp.uploadedEvidence?.length > 0 && (
              <img
                src={comp.uploadedEvidence[0].url}
                alt="evidence"
                className="w-full h-40 object-cover rounded-lg mt-3"
              />
            )}

            {/* ID */}
            <p className="text-xs text-gray-400 mt-2">ID: {comp._id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllComplaint;
