import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../store/features/auth/authSlice";

// src/components/bankOfficerDashboard/BONavbar.jsx
const BONavbar = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () =>{
    dispatch(logOut())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/")
  }
  return (
    <div className="flex justify-between items-center bg-white shadow px-6 py-4">
      <h1 className="text-xl font-semibold text-primary">
        Bank Officer Dashboard
      </h1>

      <button className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
      onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default BONavbar;
