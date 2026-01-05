import express from "express";
import customerAuth from "../middleware/customer.js";
import { complaintController } from "../controllers/complaint.js";

const complaintRoute = express.Router();

complaintRoute.post("/generate", customerAuth, complaintController);

export default complaintRoute;
