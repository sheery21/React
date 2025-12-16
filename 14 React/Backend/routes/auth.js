import express from "express";
import {
  signUpContoller,
  logInContoller,
  verifyOTPController,
  resendOTPController,
  forgetPassOTPController,
  changePassOTPController,
} from "../controllers/auth.js";

export const authRouthe = express.Router();

authRouthe.post("/signUp", signUpContoller);
authRouthe.post("/logIn", logInContoller);
authRouthe.post("/verify-otp", verifyOTPController);
authRouthe.post("/reset-otp", resendOTPController);
authRouthe.post("/forget-password", forgetPassOTPController);
authRouthe.post("/change-password", changePassOTPController);
