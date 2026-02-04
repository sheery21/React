import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  logIn_Thunk,
  logInWith_Admin_Thunk,
  logInWith_Bank_Officer_Thunk,
} from "../../store/features/auth/auth.thunk";
import Swal from "sweetalert2";

const LoginForm = ({ role }) => {
  console.log("role", role);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { success, token, user, loading, error } = useSelector(
    (state) => state.authReducer,
  );

  console.log("user role", user);

  useEffect(() => {
    if (loading) {
      Swal.fire({
        title: "Logging in...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else {
      Swal.close();
    }
  }, [loading]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "Soemthing went wrong",
      });
    }
  }, [error]);

  useEffect(() => {
    if (success && token && user) {
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        if (user.role === "customer") {
          navigate("/user-dashboard");
        } else if (user.role === "bank_officer") {
          navigate("/bank-dashboard");
        } else if (user.role === "sbp_admin") {
          navigate("/admin-dashboard");
        }
      });
    }
  }, [success, token, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please enter email and password",
      });
      return;
    }

    const payload = {
      email,
      password,
    };

    if (role === "Admin") {
      dispatch(logInWith_Admin_Thunk(payload));
    } else if (role === "Bank Officer") {
      dispatch(logInWith_Bank_Officer_Thunk(payload));
    } else {
      dispatch(logIn_Thunk(payload));
    }
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
