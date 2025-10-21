import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoModels from "./models/todoSchema.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const URI =
  "mongodb+srv://sheharyarhussaa832_db_08_React:admin123@cluster0.8qg61mo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB Connection err", error.message));

app.post("/addTodo", async (req, res) => {
  let { task } = req.body;
  try {
    const todo = await todoModels.create({ task });
    console.log("✅ Task saved:", todo);
    res.json({
      message: "Todo added successfully",
      data: task,
      status: true,
    });
  } catch (error) {
    console.log("❌ Error saving todo:", error.message);
    res.json({
      message: error.message,
      data: null,
    });
  }
});

app.get("/getTodo", async (req, res) => {
  try {
    const getTodo = await todoModels.find();
    res.json({
      message: "Todo get successfully",
      data: getTodo,
      status: true,
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
  console.log(`Server Running on http://localhost:${PORT}`)
);
