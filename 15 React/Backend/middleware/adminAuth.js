import jwt from "jsonwebtoken";
import AdminModel from "../models/adminModel.js";

export const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });
    const isVerify = jwt.verify(token, process.env.SECRET_KEY);
<<<<<<< HEAD


=======
    console.log("isVerify" , isVerify);
    
>>>>>>> a7e41c4afed9386cb055a56215291b3a58524627
    if (!isVerify) {
      return res.status(401).json({
        message: "UnAuth admin",
        status: false,
      });
    }

    const admin = await AdminModel.findById({ _id: isVerify.id });

<<<<<<< HEAD
    console.log("admin", admin);
=======
    console.log("admin" , admin);
>>>>>>> a7e41c4afed9386cb055a56215291b3a58524627

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
