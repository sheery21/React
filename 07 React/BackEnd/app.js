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

app.post("/addTodo", async (req, res) => {
  const { task } = req.body;
  try {
    const todo = await todoModels.create({ task });
    console.log("✅ Task saved:", todo);

    res.status(201).json({
      message: "Todo added successfully",
      data: task,
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

app.get("/getTodo", async (req, res) => {
  try {
    const getTodo = await todoModels.find();
    res.status(201).json({
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

app.put("/updateTodo/:id", async (req, res) => {
  let { id } = req.params;
  let { task } = req.body;
  try {
    const updaetTodo = await todoModels.findByIdAndUpdate(
      id,
      { task },
      { new: true }
    );
    if (!updaetTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(201).json({
      message: "Todo update successfully",
      data: updaetTodo,
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

app.put("/toggleTodo/:id", async (req, res) => {
  let { id } = req.params;
  try {
    const todo = await todoModels.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    todo.completed = !todo.completed;
    await todo.save();

    res.status(200).json({
      message: "Todo status toggled successfully",
      data: todo,
      status: true,
    });
  } catch (error) {}
});

app.delete("/deleteTodo/:id", async (req, res) => {
  let params = req.params.id;
  try {
    const deleteTodo = await todoModels.findByIdAndDelete(params);

    res.status(201).json({
      message: "Todo update successfully",
      data: deleteTodo,
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

app.delete("/allDelete", async (req, res) => {
  try {
    const result = await todoModels.deleteMany();
    res.status(200).json({
      message: "All todos deleted successfully",
      deletedCount: result.deletedCount,
      status: true,
    });
  } catch (error) {
    console.error("❌ Error deleting all todos:", error.message);
    res.status(500).json({
      message: "Failed to delete all todos",
      error: error.message,
      status: false,
    });
  }

  app.delete("/deleteCompleted", async (req, res) => {
    try {
      const result = await todoModels.deleteMany({ completed: true }); // delete only completed
      res.status(200).json({
        message: "All completed todos deleted successfully",
        deletedCount: result.deletedCount,
        status: true,
      });
    } catch (error) {
      console.error("❌ Error deleting completed todos:", error.message);
      res.status(500).json({
        message: "Failed to delete completed todos",
        error: error.message,
        status: false,
      });
    }
  });
});
app.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}`)
);
