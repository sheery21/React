import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  createTodoContoller,
  addTodoContoller,
  updateTodoContoller,
  getAllTodoContoller,
  deleteOneTodoContoller,
  deleteAllTodoContoller,
} from "../controllers/note.js";

export const curateRouthe = express.Router();

curateRouthe.post("/createTodo", authMiddleware, createTodoContoller);
curateRouthe.post("/addTodo", addTodoContoller);
curateRouthe.get("/getAllTodo", getAllTodoContoller);
curateRouthe.post("/updateTodo/:id", updateTodoContoller);
curateRouthe.post("/deleteOneTodo/:id", deleteOneTodoContoller);
curateRouthe.post("/deleteAllTodo", deleteAllTodoContoller);
