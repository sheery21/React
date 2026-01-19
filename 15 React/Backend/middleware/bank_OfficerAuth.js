import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import BankOfficerModel from "../models/bank_OfficerModel.js";

export const bank_officerAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isVerify = jwt.verify(token, process.env.SECRET_KEY);

    if (!isVerify) {
      return res.status(401).json({
        message: "UnAuth user",
        status: false,
      });
    }

    const user = await BankOfficerModel.findById({ _id: isVerify.id });

    if (!user) {
      return res.status(401).json({
        message: "UnAuth user",
        status: false,
      });
    }
    if (user.role === "bank_officer") {
      req.user = user;
      next();
    } else {
      return res.status(401).json({
        message: "permission de",
        status: false,
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "UnAuth user",
      status: false,
    });
  }
};
