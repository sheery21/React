import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

// src/components/dashboard/Navbar.jsx
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  console.log("user", user);
  console.log("user", user.name);

  const handleLogout = () => {
    dispatch(LogOut());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <div className="flex justify-between items-center bg-white shadow px-6 py-4">
      <h1 className="text-xl font-semibold text-primary">{user.name}</h1>

      <button
        onClick={handleLogout}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
