import express from "express";
import {
  logInController,
  logInWithAdminController,
  resendOTPController,
  signUpController,
  signUpWithAdminController,
  verifyOTPController,
} from "../controllers/auth.js";

export const authRoute = express.Router();

authRoute.post("/signUp", signUpController);
authRoute.post("/logIn", logInController);
authRoute.post("/signUp", signUpWithAdminController);
authRoute.post("/logIn/bankOffic", logInWithAdminController);
authRoute.post("/verify-otp", verifyOTPController);
authRoute.post("/resend-otp", resendOTPController);
