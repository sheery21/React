import express from "express";
import { bank_officerAuth } from "../middleware/bank_OfficerAuth.js";
import {
  bank_Officer_updateControllers,
  bank_OfficerControllers,
} from "../controllers/bank_OfficerControllers.js";

const bank_OfficerRouter = express.Router();

bank_OfficerRouter.get(
  "/get-complaints",
  bank_officerAuth,
  bank_OfficerControllers,
);

bank_OfficerRouter.put(
  "/update-complaint/:Cid",
  bank_officerAuth,
  bank_Officer_updateControllers,
);

export default bank_OfficerRouter;
