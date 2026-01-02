import express from "express"
import { signUpController } from "../controllers/auth.js"

export const authRoute = express.Router()

authRoute.post("/signUp" , signUpController)
