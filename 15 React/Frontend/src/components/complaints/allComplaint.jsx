import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserComplaints } from "../../store/features/complaint/userComp.thunk";

const AllComplaint = () => {
  const dispatch = useDispatch();

  // Redux se complaints uthana
  const { complaints, loading, error } = useSelector(
    (state) => state.userComplaints,
  );

  useEffect(() => {
    dispatch(fetchUserComplaints()); // API call ya thunk dispatch
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!complaints || complaints.length === 0)
    return <div>No Complaints Found</div>;

  return (
    <div>
      <h2>Your Complaints</h2>
      <ul>
        {complaints.map((comp) => (
          <li key={comp._id}>
            <strong>ID:</strong> {comp._id} <br />
            <strong>Title:</strong> {comp.title} <br />
            <strong>Status:</strong> {comp.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllComplaint;
