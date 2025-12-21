import { cloudinaryUploder } from "../config/cloudinary.js";
import fs from "fs";
import UserModel from "../models/user.js";

export const imageController = async (req, res) => {
  try {
    console.log("req file", req.file);

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const imageRes = await cloudinaryUploder.upload(req.file.path);
    console.log("imageRes", imageRes);
    await UserModel.findByIdAndUploder(req.useId, {
      imageUrl: imageRes.secure_url,
    });
    res.status(201).json({
      message: "image uploaded",
      url: imageRes.secure_url,
    });
  } catch (error) {
    res.status(500).json({
      message: "image uploaded",
      url: imageRes.secure_url,
    });
  } finally {
    console.log("finally");
    fs.unlinkSync(req.file.path);
  }
};
