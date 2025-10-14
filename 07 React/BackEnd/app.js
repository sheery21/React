import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoModels from "./models/todoSchema.js";

const app = express();
const PORT = process.env.PORT || 5000;

const URI =
  "mongodb+srv://sheharyarhussaa832_db_TodoApp:admin123@cluster0.vzziyc5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB Connection err", error.message));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const connectDB = async () => {
//   try {
//     await mongoose.connect(URI, {
//       serverSelectionTimeoutMS: 10000, // waits 10 seconds
//     });
//     console.log("✅ Connected to MongoDB");
//   } catch (err) {
//     console.error("❌ MongoDB connection error:", err.message);
//   }
// };

// connectDB();

app.post("/add", async (req, res) => {
  const { task } = req.body;
  try {
   const todo = await todoModels.create({ task });
    console.log("✅ Task saved:", todo);

    res.status(201).json({
      message: "Todo added successfully",
      data: task,
    });
  } catch (error) {
    console.log("❌ Error saving todo:", error.message);
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
});

app.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}`)
);
