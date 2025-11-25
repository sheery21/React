import express from "express";
import { logInContollre, resendOTPController, signUpContollre, verifyOTPController } from "../controllers/auth.js";

const authRouthe = express.Router();

authRouthe.post("/signUp", signUpContollre);

authRouthe.post("/logIn",logInContollre);

//otp
authRouthe.post("/verify-otp" ,verifyOTPController)
authRouthe.post("/reset-otp" ,resendOTPController)

export default authRouthe;

