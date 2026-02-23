import React, { useEffect } from "react";
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
        {complaints?.map((comp) => (
          <div
            key={comp._id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-primary mb-2">
              {comp.title}
            </h3>

            <p className="text-gray-600 text-sm mb-3">{comp.description}</p>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">ID: {comp._id}</span>

              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  comp.status === "Pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : comp.status === "Resolved"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-600"
                }`}
              >
                {comp.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllComplaint;
