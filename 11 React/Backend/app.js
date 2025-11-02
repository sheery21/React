import express, { request, response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt, { truncates } from "bcryptjs";
import jwt from "jsonwebtoken";
import e from "cors";
import userModel from "./models/userSchema.js";
import { authMiddleware } from "./middleware/auth.js";
import todoModels from "./models/todosSchema.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const URI =
  "mongodb+srv://sheharyarhussaa832_db_notesApp:admin123@cluster0.xsuddjt.mongodb.net/?appName=Cluster0";

mongoose
  .connect(URI)
  .then(() => console.log("MANGODB CONNECT!"))
  .catch((error) => console.log("MANGODB ERROR", error.message));

app.post("/signUp", async (request, response) => {
  const body = request.body;
  const userPass = body.password;
  try {
    const user = await userModel.findOne({ email: body.email });
    if (user) {
      return response.json({
        message: "Email address already exists!",
        status: false,
        data: null,
      });
    }

    const heahPass = await bcrypt.hash(userPass, 10);
    const obj = {
      ...body,
      password: heahPass,
    };
    const userRes = await userModel.create(obj);
    return response.json({
      message: "user successfully signUp",
      status: true,
      data: userRes,
    });
  } catch (error) {
    response.json({
      message: error.message || "somting went wrong",
      status: false,
    });
  }
});

app.post("/logIn", async (request, response) => {
  const { email, password } = request.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return response.json({
        message: "email or password invalid",
        status: false,
      });
    }

    const passCompare = await bcrypt.compare(password, user.password);

    const userObj = {
      fullName: user.fullName,
      gender: user.gender,
      email: user.email,
    };

    if (!passCompare) {
      return response.json({
        message: "email or password invalid",
        status: false,
      });
    }

    const data = { _id: user._id };
    const PRIVATE_KEY = "SHERRY!";
    const token = jwt.sign(data, PRIVATE_KEY, {
      expiresIn: "24h",
    });

    response.json({
      message: "user successfully login",
      status: true,
      user: userObj,
      token,
    });
  } catch (error) {
    response.json({
      message: error.message || "something went wrong",
      status: false,
    });
  }
});

app.post("/createpost", authMiddleware, (request, response) => {
  response.json("API HIT : post Created");
});

app.post("/addTodo", async (req, res) => {
  try {
    const { task1, task2 } = req.body;
    console.log("task1", "task2", task1, task2);

    const task = await todoModels.create({ task1, task2 });
    res.json({
      message: "Todo added successfully",
      data: task,
      status: true,
    });
  } catch (error) {
    console.log("Error saving todo:", error.message);
    res.json({
      message: error.message,
      data: null,
    });
  }
});
app.get("/getTodo", async (request, response) => {
  try {
    const getTodo = await todoModels.find();
    const data = await getTodo.data;
    console.log(data, "data");

    response.json({
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

app.put("/updateTodo/:id", async (request, response) => {
  const { id } = request.params;
  const { task1 , task2 } = request.body;
  try {
    const updateTask = await todoModels.findByIdAndUpdate(
      id,
      { task1,task2 },
      { new: true }
    );
    if (!updateTask) {
      return response.json({ message: "Todo not found", status: false });
    }

    response.json({
      message: updateTask,
      status: true,
    });
  } catch (error) {
    response.json({
      message: error.message,
      status: false,
    });
  }
});

app.delete("/deleteTodo/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const deleteTodo = await todoModels.findByIdAndDelete(id);
    response.json({
      message: "Todo update successfully",
      data: deleteTodo,
      status: true,
    });
  } catch (error) {
    response.json({
      message: error.message,
      data: null,
    });
  }
});

app.delete("/deleteAllTodo", async (request, response) => {
  try {
    const allDelete = await todoModels.deleteMany();
    response.json({
      message: "All completed todos deleted successfully",
      deletedCount: allDelete.deletedCount,
      status: true,
    });
  } catch (error) {
    response.json({
      message: "Failed to delete completed todos",
      error: error.message,
      status: false,
    });
  }
});

app.listen(PORT, () =>
  console.log(`server running on http://localhost${PORT}`)
);
