import express from "express";
import { upload } from "../middleware/multerMiddleware.js";
import { cloudinaryUploder } from "../config/cloufinary.js";
import { authMiddleware } from "../middleware/auth.js";
import UserModel from "../models/user.js";
import fs from "fs";

console.log(
  process.env.CLOUDINARY_CLOUD_NAME,
  "process.env.CLOUDINARY_CLOUD_NAME"
);

const imageRouthe = express.Router();

imageRouthe.post("/upload",authMiddleware ,  upload.single("profileImage"), async (req, res) => {
  try {
    console.log("req file", req.file);
    const imageRes = await cloudinaryUploder.upload(req.file.path);
    console.log("imageRes", imageRes);

    await UserModel.findByIdAndUpdate(req.userId, {
      imageUrl: imageRes.secure_url,
    });
    res.json({
      message: "image uploaded",
      url: imageRes.secure_url,
    });
  } catch (error) {
    console.log("error upload image", error.message);
  } finally {
    console.log("finally");
    fs.unlinkSync(req.file.path);
  }
});

export default imageRouthe;