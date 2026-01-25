// src/components/auth/SignupForm.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { sigUpThunk } from "../../store/features/auth.thunk";
import axios from "axios";

const roles = [
  { label: "Customer", value: "customer" },
  { label: "Bank Officer", value: "bank_officer" },
  { label: "SBP Admin", value: "sbp_admin" },
];

const SignupForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.authReducer);
  const URL_ALL_BANKS = import.meta.env.VITE_LOCAL_HOST_ALL_BANKS_API;
  const [banks, setBanks] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "customer",
    bankId: null,
  });
  console.log("loading", loading);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await axios.get(URL_ALL_BANKS);
        const { data } = await res.data;
        setBanks(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchBanks();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBankSelect = (bankId) => {
    setFormData({ ...formData, bankId });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (formData.role === "customer" && !formData.bankId) {
      alert("Please select your bank");
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      role: formData.role,
      bankId: formData.role === "customer" ? formData.bankId : null,
    };

    dispatch(sigUpThunk(payload));

    console.log("Signup Payload:", payload);
    alert("Signup attempted");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-primary text-center">
          Signup
        </h2>

        {/* ROLE SLIDER */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          {roles.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => setFormData({ ...formData, role: r.value })}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition
                ${
                  formData.role === r.value
                    ? "bg-primary text-white shadow"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-primary"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-primary"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-primary"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          {formData.role === "customer" && (
            <div className="p-4">
              <h2 className="text-xl font-bold text-primary mb-3 text-center">
                Select Your Bank
              </h2>

              <select
                name="bankId"
                value={formData.bankId || ""}
                onChange={handleChange}
                className="w-full border rounded p-2 bg-white text-gray-800 focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">-- Select Bank --</option>
                {Array.isArray(banks) &&
                  banks.map((bank) => (
                    <option key={bank._id} value={bank._id}>
                      {bank.bankName} ({bank.bankCode})
                    </option>
                  ))}
              </select>

              {!formData.bankId && (
                <p className="text-sm text-red-500 mt-2 text-center">
                  Please select a bank
                </p>
              )}
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-primary"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-primary"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white p-2 rounded hover:bg-secondary transition"
          >
            Signup as {formData.role.replace("_", " ")}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <Link
            to={`/${formData.role}-login`}
            className="text-primary hover:underline"
          >
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
