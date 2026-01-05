import express from "express";
import { logInController, resendOTPController, signUpController, verifyOTPController } from "../controllers/auth.js";

export const authRoute = express.Router();

authRoute.post("/signUp", signUpController);
authRoute.post("/logIn", logInController);
authRoute.post("/verify-otp", verifyOTPController);
authRoute.post("/resend-otp", resendOTPController);

