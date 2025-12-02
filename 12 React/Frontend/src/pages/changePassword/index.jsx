import { useState } from "react";
import "./change.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); // ✅ redirect ke liye
  const LOGNIN_API = "http://localhost:3000/api/auth/change-password";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please fill all fields!",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "New passwords do not match!",
      });
      return;
    }

    try {
      const token = searchParams.get("q");

      await axios.post(LOGNIN_API, { token, newPassword });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Password updated successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

      // ✅ Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  };

  return (
    <div className="change-container">
      <div className="change-box">
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <label>Confirm New Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit">Update Password</button>
        </form>
      </div>
    </div>
  );
}
