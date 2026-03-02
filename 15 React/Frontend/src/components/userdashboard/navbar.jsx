import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

// src/components/dashboard/Navbar.jsx
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authReducer);

  const handleLogout = () => {
    dispatch(logOut());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  console.log("user", user);
  console.log("user name", user?.name);
  return (
    <div className="flex justify-between items-center bg-white shadow px-6 py-4">
      <h1 className="text-xl font-semibold text-primary">
        {user?.name || "User"}
      </h1>

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
