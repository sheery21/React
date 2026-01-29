import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  adminOtp,
  Bank_OfficerOtp,
  userOtp,
} from "../../store/features/auth/auth.thunk";
import Swal from "sweetalert2";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, otpVerified, error, user } = useSelector(
    (state) => state.authReducer,
  );
  const location = useLocation();
  const role = location.state?.role;

  useEffect(() => {
    if (otpVerified) {
      Swal.fire("Success", "OTP Verified Successfully", "success");

      // role based redirect
      if (role === "customer") navigate("/user-login");
      if (role === "bank_officer") navigate("/bank-officer-login");
      if (role === "sbp_admin") navigate("/admin-login");
    }
    if (error) {
      Swal.fire("Error", error?.message || "Invalid OTP", "error");
    }
  }, [otpVerified, error, navigate, role]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("OTP response user:", user);

    if (!email) {
      Swal.fire("Error", "Email is required", "error");
      return;
    }

    if (otp.length !== 4) {
      Swal.fire("Error", "Please enter 4 digit OTP", "error");
      return;
    }

    const payload = {
      email,
      otp,
    };
    if (role === "bank_officer") {
      dispatch(Bank_OfficerOtp(payload));
    } else if (role === "sbp_admin") {
      dispatch(adminOtp(payload));
    } else {
      dispatch(userOtp(payload));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-primary">
          OTP Verification
        </h2>

        <p className="text-sm text-gray-600 mb-6">
          Enter the 4-digit OTP sent to your email
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            maxLength="4"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/[^a-zA-Z0-9]/g, ""))
            }
            className="w-full text-center tracking-widest text-xl border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="• • • •"
          />

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-secondary transition"
          >
            {loading ? "Verifying..." : "Veify OTP"}
          </button>
        </form>

        <div className="text-center mt-4">
          <button className="text-sm text-primary hover:underline">
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
