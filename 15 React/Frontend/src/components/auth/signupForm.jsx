// src/components/auth/SignupForm.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignupForm = ({ role }) => {
    console.log('role' , role);
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert(`${role} signup attempted: ${email}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-primary">{role} Signup</h2>
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
          <div>
            <label className="block mb-1 font-medium">Confirm Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white p-2 rounded hover:bg-secondary transition"
          >
            Signup
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          <Link
            to={`/${role.toLowerCase().replace(/\s+/g, "-")}-login`}
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
