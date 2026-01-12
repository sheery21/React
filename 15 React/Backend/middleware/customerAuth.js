import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const customerAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const isVerified = jwt.verify(token, process.env.SECRET_KEY);
    if (!isVerified) {
      return res.status(401).json({
        message: "UnAuth user",
        status: false,
      });
    }

    const user = await UserModel.findById(isVerified.id).select("role bankId");

    if (!user) {
      return res.status(401).json({
        message: "UnAuth user",
        status: false,
      });
    }
    if (user.role === "customer") {
      req.user = user;
      next();
    } else {
      return res.status(401).json({
        message: "permission de",
        status: false,
      });
    }
    console.log("isVerify", user);
  } catch (error) {
    return res.status(401).json({
      message: "UnAuth user",
      status: false,
    });
  }
};

export default customerAuth;
