import express from "express";
import { adminControllers } from "../controllers/adminControllers.js";
import { adminAuth } from "../middleware/adminAuth.js";

const adminRouter = express.Router();

adminRouter.get("/getComplaints/", adminAuth, adminControllers);

export default adminRouter;
