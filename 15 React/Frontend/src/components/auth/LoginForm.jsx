import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logIn_Thunk } from "../../store/features/auth/auth.thunk";

const LoginForm = ({ role }) => {
  console.log("role", role);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { success, token, user, loading, error } = useSelector(
    (state) => state.authReducer,
  );

  useEffect(() => {
    if (success && token && user) {
      if (user.role === "customer") {
        navigate("/user-dashboard");
      } else if (user.role === "bank_officer") {
        navigate("/bank-dashboard");
      } else if (user.role === "sbp_admin") {
        navigate("/admin-dashboard");
      }
    }
  }, [success, token, user]);
  console.log("loading", loading);
  console.log("error", error);
  console.log("success", success);
  console.log("token", token);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${role} login attempted: ${email}`);
    const payload = {
      email,
      password,
    };

    dispatch(logIn_Thunk(payload));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-primary">{role} Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white p-2 rounded hover:bg-secondary transition"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          <Link
            to={`/${role.toLowerCase().replace(/\s+/g, "-")}-signup`}
            className="text-primary hover:underline"
          >
            Create new account
          </Link>
          <span className="mx-2">|</span>
          <Link to="/forgot-password" className="text-primary hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
