import { useEffect, useState } from "react";
import "./otp.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export default function OtpVerification() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [isSuccess, setisSucccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const URL = "http://localhost:3000/api/auth/verify-otp";
  const URL_SEND_OTP = "http://localhost:3000/api/auth/reset-otp";

  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/");
    }
  });

  const handleChange = (value, index) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 4) {
      return Swal.fire({
        title: "Missing Information!",
        text: "Please fill out all fields before signing up.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }

    try {
      const body = {
        email: location.state.email,
        otp: code,
      };

      const respons = await axios.post(URL, body);
      const data = await respons.data;

      if (data.status) {
        setisSucccess(true);
        setError("");
        Swal.fire({
          title: "OTP Verified!",
          text: "Your account has been successfully verified.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          navigate("/");
        });
      } else {
        return Swal.fire({
          title: data.status,
          text: data.status,
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.log(error.message);
      setError("Server error. Please try again later.");
      Swal.fire({
        title: "Error!",
        text: "Server error. Please try again later.",
        icon: "error",
      });
    }
  };

  const hindleSendOtp = async () => {
    try {
      const respons = await axios.post(URL_SEND_OTP, {
        email: location.state.email,
      });
      const data = await respons.data;

      if (data.status) {
        Swal.fire({
          title: "OTP Sent!",
          text: "A new OTP has been sent to your email.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
      } else {
        setisSucccess(false);
        setError(data.message || "Failed to send OTP");
        Swal.fire({
          title: "Error!",
          text: data.message || "Failed to send OTP",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.log(error.message);
      setisSucccess(false);
      setError("Server error. Please try again later.");
      Swal.fire({
        title: "Error!",
        text: "Server error. Please try again later.",
        icon: "error",
      });
    }
  };

  return (
    <div className="otp-main">
      <form className="otp-box" onSubmit={handleSubmit}>
        <h2>OTP Verification</h2>
        <p>Enter the 4-digit code sent to your email</p>

        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
            />
          ))}
        </div>

        <button type="submit" className="otp-btn">
          Verify OTP
        </button>

        {error && <p className="error-message">{error}</p>}
        {isSuccess && (
          <p className="success-message">OTP verified successfully!</p>
        )}
        <p className="resend" onClick={hindleSendOtp}>
          Didn’t receive code? <span>Resend</span>
        </p>
      </form>
    </div>
  );
}
