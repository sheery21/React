import express from "express";
import customerAuth from "../middleware/customerAuth.js";
import {
  allComplaints,
  complaintController,
} from "../controllers/complaint.js";

const complaintRoute = express.Router();

complaintRoute.post("/generate", customerAuth, complaintController);
complaintRoute.get("/getAllComplaint", customerAuth, allComplaints);

export default complaintRoute;
