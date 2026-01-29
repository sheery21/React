// src/components/adminDashboard/AdminStatCard.jsx
const AdminStatCard = ({ title, value }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold text-primary mt-2">{value}</h2>
    </div>
  );
};

export default AdminStatCard;
