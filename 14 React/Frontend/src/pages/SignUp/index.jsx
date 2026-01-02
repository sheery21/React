import React, { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [mobileNUmber, setmobileNUmber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  function validate() {
    if (!name) return "Full name is required";
    if (!mobileNUmber) return "Mobile number is required";
    if (!email) return "Email is required";

    if (mobileNUmber.length !== 11) return "Mobile number must be 11 digits";
    const phoneRegex = /^03\d{9}$/;
    if (!phoneRegex.test(mobileNUmber))
      return "Please enter a valid Pakistani mobile number (03XXXXXXXXX)";

    const re = /^\S+@\S+\.\S+$/;
    if (!re.test(email)) return "Please enter a valid email";

    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (password !== confirmPassword) return "Passwords do not match";

    return "";
  }

  async function handleSubmit() {
    setError("");
    const v = validate();
    if (v) return setError(v);

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 900));
      alert("Account created (demo): " + email);

      await axios.post(`${API_URL}/auth/signUp`, {
        name,
        mobileNUmber,
        email,
        password,
      });

      navigate("/OtpVer", { state: { email } });
    } catch (err) {
      console.log(err);

      setError("Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-6 md:p-8 transform transition duration-300 hover:scale-[1.01]">
        <h1 className="text-2xl font-bold mb-1">Create Account</h1>
        <p className="text-sm text-slate-500 mb-6">Sign up to get started</p>

        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              Full Name
            </span>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              Mobile Number
            </span>
            <Input
              type="number"
              value={mobileNUmber}
              onChange={(e) => setmobileNUmber(e.target.value)}
              placeholder="+92 30"
              className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </label>

          <label className="block relative">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 pr-10 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <Button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-2 top-8 inline-flex items-center justify-center p-1 rounded-md"
            >
              {showPassword ? "🙈" : "👁️"}
            </Button>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              Confirm Password
            </span>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </label>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <Button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 font-medium shadow hover:bg-indigo-700 disabled:opacity-60"
            onClick={handleSubmit}
          >
            {loading && (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            )}
            <span>{loading ? "Creating account..." : "Sign Up"}</span>
          </Button>

          <Link
            to="/"
            className="text-center text-sm text-slate-500 mt-2 block"
          >
            Already have an account?{" "}
            <span className="text-indigo-600 hover:underline">Log in</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
