import express from "express";
import {
  logInController,
  logInWithAdminController,
  logInWithBank_OfficerController,
  resendOTPController,
  signUpController,
  signUpWithAdminController,
  signUpWithBAnk_OfficerController,
  verifyOTPController,
} from "../controllers/auth.js";

export const authRoute = express.Router();

authRoute.post("/signUp", signUpController);
authRoute.post("/logIn", logInController);
authRoute.post("/signUp/admin", signUpWithAdminController);
authRoute.post("/logIn/admin", logInWithAdminController);
authRoute.post("/signUp/Bank_Officer", signUpWithBAnk_OfficerController);
authRoute.post("/logIn/Bank_Officer", logInWithBank_OfficerController);
authRoute.post("/verify-otp", verifyOTPController);
authRoute.post("/resend-otp", resendOTPController);
