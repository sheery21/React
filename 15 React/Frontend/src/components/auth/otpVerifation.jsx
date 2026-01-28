import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

const OtpVerification = ({ role }) => {
  const [otp, setOtp] = useState("");
  // const dispatch = useDispatch()
  // const {loading , success , error } = useSelector( (state) => state.authReducer)

  const handleSubmit = (e) => {
    e.preventDefault();

    if (otp.length !== 4) {
      alert("Please enter 4 digit OTP");
      return;
    }

    alert(`${role} OTP verified: ${otp}`);
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
            type="text"
            maxLength="4"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            className="w-full text-center tracking-widest text-xl border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="• • • •"
          />

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-secondary transition"
          >
            Verify OTP
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
