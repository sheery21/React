import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    if (!email) return "Email is required";
    // simple email regex
    const re = /^\S+@\S+\.\S+$/;
    if (!re.test(email)) return "Please enter a valid email";
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  }

  async function handleSubmit() {
    console.log("hello");
    
    setError("");
    const v = validate();
    if (v) return setError(v);

    setLoading(true);
    try {
      // fake login delay
      await new Promise((r) => setTimeout(r, 900));
      // TODO: replace with real auth call (fetch / axios)
      // For demo, consider any email/password that passes validation as success
      alert("Logged in (demo): " + email);
    } catch (err) {
        console.log(err);
      setError("Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left - Illustration area */}
        <div className="hidden md:flex flex-col gap-4 p-6 rounded-2xl shadow-lg bg-white/60 backdrop-blur-md animate-fadeIn">
          <h2 className="text-2xl font-semibold">Welcome back 👋</h2>
          <p className="text-sm text-slate-600">Login to continue to your dashboard. Secure access with Tailwind + React.</p>

          <div className="mt-4 grid gap-3">
            <div className="text-xs text-slate-500">Quick tips</div>
            <ul className="list-disc list-inside text-sm text-slate-600">
              <li>Use a valid email (e.g., you@domain.com)</li>
              <li>Password must be at least 6 characters</li>
              <li>Demo login — replace the handler with your auth API</li>
            </ul>
          </div>
        </div>

        {/* Right - Form card */}
        <div className="w-full bg-white rounded-2xl shadow-xl p-6 md:p-8 transform transition duration-300 hover:scale-[1.01]">
          <h1 className="text-2xl font-bold mb-1">Sign In</h1>
          <p className="text-sm text-slate-500 mb-6">Enter your credentials to access your account</p>

          <div  className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Email</span>
              < Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                aria-label="Email"
                required
              />
            </label>

            <label className="block relative">
              <span className="text-sm font-medium text-slate-700">Password</span>
              < Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 pr-10 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                aria-label="Password"
                required
              />

              <Button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-8 inline-flex items-center justify-center p-1 rounded-md"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.97 9.97 0 012.175-6.125M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.575 1.763-1.666 3.25-2.95 4.33M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </Button>
            </label>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>

              <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot?</a>
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 font-medium shadow hover:bg-indigo-700 disabled:opacity-60"
              onClick={handleSubmit}
            >
              {loading ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
              ) : null}
              <span>{loading ? "Signing in..." : "Sign In"}</span>
            </Button>

            <div className="text-center text-sm text-slate-500">or continue with</div>

            <div className="grid grid-cols-2 gap-3">
              <Button type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 hover:bg-slate-50">
                {/* Google SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 12.5v8.5h13.9C36.4 27.9 31.6 31 24 31 16.2 31 9.8 25.2 9.8 17.9S16.2 4.9 24 4.9c3.8 0 6.9 1.4 9 3.3l6.4-6.4C36.3 1.2 30.6 0 24 0 10.7 0 0 10.7 0 24s10.7 24 24 24 24-10.7 24-24c0-1.6-.1-3.1-.4-4.6H24z" />
                </svg>
                <span className="text-sm">Google</span>
              </Button>

              <Button type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 hover:bg-slate-50">
                {/* GitHub SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .5C5.73.5.88 5.35.88 11.62c0 4.68 3.02 8.66 7.21 10.06.53.1.72-.23.72-.51 0-.25-.01-.92-.01-1.81-2.93.64-3.55-1.41-3.55-1.41-.48-1.22-1.17-1.55-1.17-1.55-.96-.66.07-.65.07-.65 1.06.07 1.62 1.09 1.62 1.09.94 1.61 2.46 1.15 3.06.88.09-.69.37-1.15.67-1.41-2.34-.27-4.8-1.17-4.8-5.21 0-1.15.41-2.09 1.08-2.83-.11-.27-.47-1.37.1-2.85 0 0 .88-.28 2.9 1.08a10.1 10.1 0 012.64-.36c.9.01 1.8.12 2.64.36 2.02-1.36 2.9-1.08 2.9-1.08.57 1.48.21 2.58.1 2.85.67.74 1.08 1.68 1.08 2.83 0 4.05-2.47 4.93-4.82 5.19.38.33.72.98.72 1.98 0 1.43-.01 2.58-.01 2.93 0 .28.19.61.73.51C20.1 20.28 23.12 16.3 23.12 11.62 23.12 5.35 18.27.5 12 .5z" />
                </svg>
                <span className="text-sm">GitHub</span>
              </Button>
            </div>

            <Link to={"singnUp"} className="text-center text-sm text-slate-500 mt-2">
              Don't have an account? <a href="#" className="text-indigo-600 hover:underline">Sign up</a>
            </Link>
          </div>
        </div>
      </div>

      {/* lightweight animation styles (you can add to tailwind config for proper class) */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 400ms ease both; }
      `}</style>
    </div>
  );
}
