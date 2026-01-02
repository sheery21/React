import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export default function OtpVerification() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const URL = import.meta.env.VITE_API_URL + "/auth/verify-otp";
  const URL_SEND_OTP = import.meta.env.VITE_API_URL + "/auth/reset-otp";

  useEffect(() => {
    if (!location?.state?.email) navigate("/");
  }, [location, navigate]);

  /* OTP Change */
  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(""); // clear error on typing

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  /* Verify OTP */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");

    if (code.length < 4) {
      setError("Please enter complete 4-digit OTP");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(URL, {
        email: location.state.email,
        otp: code,
      });

      if (res.data.status) {
        setIsSuccess(true);
        Swal.fire({
          title: "OTP Verified!",
          icon: "success",
        }).then(() => navigate("/"));
      } else {
        setError(res.data.message || "Invalid OTP");
      }
    } catch (err) {
      // 🔥 Proper server error handling
      if (err.response) {
        setError(err.response.data.message || "OTP verification failed");
      } else if (err.request) {
        setError("Network error. Please check your internet.");
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  /* Resend OTP */
  const handleSendOtp = async () => {
    try {
      setError("");
      setLoading(true);

      const res = await axios.post(URL_SEND_OTP, {
        email: location.state.email,
      });

      if (res.data.status) {
        Swal.fire({
          title: "OTP Sent!",
          text: "New OTP has been sent to your email.",
          icon: "success",
        });
      } else {
        setError(res.data.message || "Failed to send OTP");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Failed to resend OTP");
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-[350px] rounded-xl bg-white p-8 text-center shadow-lg"
      >
        <h2 className="mb-2 text-xl font-bold">OTP Verification</h2>
        <p className="mb-5 text-sm text-gray-600">
          Enter the 4-digit code sent to your email
        </p>

        {/* OTP Inputs */}
        <div className="mb-6 flex justify-between">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className={`h-14 w-14 rounded-lg border text-center text-2xl font-bold outline-none transition
                ${
                  error
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-blue-600"
                }
              `}
            />
          ))}
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-3 text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Error / Success */}
        {error && <p className="mt-3 font-medium text-red-600">{error}</p>}
        {isSuccess && (
          <p className="mt-3 font-medium text-green-600">
            OTP verified successfully!
          </p>
        )}

        {/* Resend */}
        <p
          onClick={!loading ? handleSendOtp : undefined}
          className="mt-4 cursor-pointer text-sm text-gray-600"
        >
          Didn’t receive code?{" "}
          <span className="font-bold text-blue-600">Resend</span>
        </p>
      </form>
    </div>
  );
}
