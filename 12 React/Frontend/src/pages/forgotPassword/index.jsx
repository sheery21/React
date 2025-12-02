import { useState } from "react";
import "./forgot.css";
import axios from "axios";
import Swal from "sweetalert2";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const URL = "http://localhost:3000/api/auth/forget-password";
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email!");
      return;
    }
    setLoading(true);

    // API call here

    try {
      const response = await axios.post(URL, { email });
      if (response.data.status) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.message,
        });
      } else {
         Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message,
        });
      }
    } catch (error) {
       Swal.fire({
        icon: "error",
        title: "Server Error",
        text: error.response?.data?.message || error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h2>Forgot Password</h2>

        <p className="subtitle">
          Enter your email to receive a password reset link.
        </p>

        <form onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit" disabled={loading}>{loading ? "Sending..." : "Send Reset Link"}</button>
        </form>
      </div>
    </div>
  );
}
