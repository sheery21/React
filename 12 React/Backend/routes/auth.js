import express from "express";
import { logInContollre, signUpContollre } from "../controllers/auth.js";

const authRouthe = express.Router();

authRouthe.post("/signUp", signUpContollre);

authRouthe.post("/logIn",logInContollre);

export default authRouthe;

