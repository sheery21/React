import express from "express";
import { bank_officerAuth } from "../middleware/bank_OfficerAuth.js";
import { bank_OfficerControllers } from "../controllers/bank_OfficerControllers.js";

const bank_OfficerRouter = express.Router();

bank_OfficerRouter.get(
  "/get-complaints",
  bank_officerAuth,
  bank_OfficerControllers
);

export default bank_OfficerRouter;
