import express from "express";
import { adminControllers } from "../controllers/adminControllers.js";

const adminRouter = express.Router();

adminRouter.get("/getComplaints/", adminControllers);

export default adminRouter;
