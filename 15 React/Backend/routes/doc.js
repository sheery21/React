import express from "express";
import { docControlers } from "../controllers/doc.js";
import customerAuth from "../middleware/customerAuth.js";
import { upload } from "../middleware/multer.js";

const docRouts = express.Router();

docRouts.post("/upload", customerAuth, upload.any(), docControlers);

export default docRouts;
