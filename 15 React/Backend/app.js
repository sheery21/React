import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/db.js";
import { authRoute } from "./routes/auth.js";
import bankRoute from "./routes/bank.js";
import complaintRoute from "./routes/complaint.js";
import customerAuth from "./middleware/customer.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();

app.use("/api/auth", authRoute);
app.use("/api/bank", bankRoute);
app.use("/api/complaint", customerAuth , complaintRoute);

app.listen(PORT, () =>
  console.log(`server running on ${process.env.LOCEL_HOST}${PORT}`)
);
