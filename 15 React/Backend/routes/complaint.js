import express from "express";
import customerAuth from "../middleware/customerAuth.js";
import { complaintController, getAllComplaint } from "../controllers/complaint.js";

const complaintRoute = express.Router();

complaintRoute.post("/generate", customerAuth, complaintController);
complaintRoute.get("/getAllComplaint", customerAuth, getAllComplaint);

export default complaintRoute;
