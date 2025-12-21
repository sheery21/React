import express from "express";
import { upload } from "../middleware/multerMiddeware.js";
import { imageController } from "../controllers/image.js";

export const imageRouthe = express.Router();

imageRouthe.post("/upload", upload.single("profileImage"), imageController);
