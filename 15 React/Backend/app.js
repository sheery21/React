import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/db.js";
import { authRoute } from "./routes/auth.js";
import bankRoute from "./routes/bank.js";
import complaintRoute from "./routes/complaint.js";
import docRouts from "./routes/doc.js";
import bank_OfficerRouter from "./routes/bank_OfficeRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();

app.use("/api/auth", authRoute);
app.use("/api/bank", bankRoute);
app.use("/api/complaint", complaintRoute);
app.use("/api/image", docRouts);

app.use("/api/bank_officer", bank_OfficerRouter);

app.use("/api/admin", adminRouter);

app.listen(PORT, () =>
  console.log(`server running on ${process.env.LOCEL_HOST}${PORT}`)
);
