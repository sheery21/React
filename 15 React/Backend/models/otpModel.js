import mongoose from "mongoose";

const OTPSchema  = new mongoose.Schema(
  {
    otp: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const OtpModel = mongoose.model("otp", OTPSchema );

export default OtpModel;
