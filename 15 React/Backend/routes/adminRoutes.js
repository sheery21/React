import express from "express";

import {
  adminControllers,
  deleteComplaint,
  deleteUser,
  getAllBanks,
  getAllBanks_Officer,
  getAllUsers,
} from "../controllers/adminControllers.js";

import { adminAuth } from "../middleware/adminAuth.js";

const adminRouter = express.Router();

adminRouter.get("/getComplaints/", adminAuth, adminControllers);

adminRouter.post("/deleteComplaints/:id", adminAuth, deleteComplaint);
adminRouter.get("/getAllusers", adminAuth, getAllUsers);
adminRouter.get("/getAllBank_officer", adminAuth, getAllBanks_Officer);
adminRouter.delete("/user/:type/:id", adminAuth, deleteUser);
adminRouter.get("/getAllBanks", adminAuth, getAllBanks);

export default adminRouter;
