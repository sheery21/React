import React from "react";
import { useSelector } from "react-redux";
import StatCard from "./statcard";

const UserDashbosrdHome = () => {
  const { complaints } = useSelector((state) => state.complaint);

  const total = complaints.length || 0;
  const high = complaints.filter((c) => c.priority === "high").length || 0;
  const pending = complaints.filter((c) => c.status === "pending").length || 0;
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard title="Total Complaints" value={total} />
      <StatCard title="High Priority" value={high} />
      <StatCard title="Pending Complaints" value={pending} />
    </div>
  );
};

export default UserDashbosrdHome;
