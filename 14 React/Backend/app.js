import express from "express";
import { dbConnect } from "./config/db.js";
import cros from "cors";
import dotenv from "dotenv";
import { authRouthe } from "./routes/auth.js";
import { curateRouthe } from "./routes/curat.js";
import { imageRouthe } from "./routes/image.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cros());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();

app.use("/api/auth", authRouthe);
app.use("/api/cuate", curateRouthe);
app.use("/api/image", imageRouthe);
app.listen(PORT, () =>
  console.log(` server running on ${process.env.LOCAL_HOST}${PORT} `)
);
