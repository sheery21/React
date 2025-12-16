import express from "express";
import { upload } from "../middleware/multerMiddeware";
import { cloudinaryUploder } from "../config/cloudinary.js";

const imageRouthe = express.Router();

imageRouthe.post("/upload", upload.single("profileImage"), async (req, res) => {
  try {
    console.log("req file", req.file);

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
});
