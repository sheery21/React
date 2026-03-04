// src/components/bankOfficerDashboard/BOSidebar.jsx
const BOSidebar = ({ activeTab, setActiveTab }) => {
  const menuUtems = [
    "dashboard",
    "pending",
    "approved",
    "rejected",
    "settings",
  ];
  return (
    <div className="w-64 bg-primary text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-8">Bank Officer</h2>

      <ul className="space-y-4">
        {menuUtems.map((item) => (
          <li
            key={item}
            onClick={() => setActiveTab(item)}
            className={`p-2 rounded 
              cursor-pointer
               capitalize ${
                 activeTab === item ? "bg-secondary" : "hover:bg-secondary"
               }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BOSidebar;
