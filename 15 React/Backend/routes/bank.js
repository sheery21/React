import express from "express";
import {
  AddBankController,
  BankDropdownController,
} from "../controllers/bank.js";

const bankRoute = express.Router();

bankRoute.post("/addBank", AddBankController);
bankRoute.get("/bankDropdown", BankDropdownController);

export default bankRoute;
