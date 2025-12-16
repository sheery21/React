import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobileNUmber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: Boolean,
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
