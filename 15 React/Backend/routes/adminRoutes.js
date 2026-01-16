import express from "express";
import { adminControllers } from "../controllers/adminControllers.js";

const adminRouter = express.Router();

adminRouter.get("/get-complaints", adminControllers);

export default adminRouter;
