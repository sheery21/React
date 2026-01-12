import mongoose from "mongoose";

const  bankOfficerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["customer", "bank_officer", "sbp_admin"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    bankId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bank",
    },
  },
  { timestamps: true }
);

const BankOfficerModel = mongoose.model("bankOfficer", bankOfficerSchema);

export default BankOfficerModel;
