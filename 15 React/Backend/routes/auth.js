import express from "express";
import {
  logInController,
  logInWithAdminController,
  logInWithBank_OfficerController,
  resendOTPController,
  signUpController,
  signUpWithAdminController,
  signUpWithBAnk_OfficerController,
  verifyOTP_WithAdmin_Controller,
  verifyOTP_WithBank_Officer_Controller,
  verifyOTPController,
} from "../controllers/auth.js";

export const authRoute = express.Router();

// SignUp And LogIn Or Otp Verify With User Side
authRoute.post("/signUp", signUpController);
authRoute.post("/logIn", logInController);
authRoute.post("/verify-otp", verifyOTPController);

// SignUp And LogIn Or Otp Verify With Admin Side
authRoute.post("/signUp/admin", signUpWithAdminController);
authRoute.post("/logIn/admin", logInWithAdminController);
authRoute.post("/verify/admin-otp", verifyOTP_WithAdmin_Controller);

// SignUp And LogIn Or Otp Verify With Bank Officer Side
authRoute.post("/signUp/Bank_Officer", signUpWithBAnk_OfficerController);
authRoute.post("/logIn/Bank_Officer", logInWithBank_OfficerController);
authRoute.post(
  "/verify/bank_Officer-otp",
  verifyOTP_WithBank_Officer_Controller,
);

authRoute.post("/resend-otp", resendOTPController);
