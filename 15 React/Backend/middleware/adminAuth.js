import jwt from "jsonwebtoken";
import AdminModel from "../models/adminModel.js";

export const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isVerify = jwt.verify(token, process.env.SECRET_KEY);
    console.log("isVerify" , isVerify);
    
    if (!isVerify) {
      return res.status(401).json({
        message: "UnAuth admin",
        status: false,
      });
    }

    const admin = await AdminModel.findById({ _id: isVerify.id });

    console.log("admin" , admin);

    if (!admin) {
      return res.status(401).json({
        message: "UnAuth admin",
        status: false,
      });
    }
    if (admin.role === "sbp_admin") {
      req.admin = admin;
      next();
    } else {
      return res.status(401).json({
        message: "permission de",
        status: false,
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "UnAuth admin",
      status: false,
    });
  }
};
