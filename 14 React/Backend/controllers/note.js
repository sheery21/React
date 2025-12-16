import NoteModel from "../models/note.js";

export const createTodoContoller = (req, res) => {
  res.json("API HIT : post Created");
};
export const addTodoContoller = async (req, res) => {
  const { task1, task2 } = req.body;
  try {
    const task = await NoteModel.create({ task1, task2 });

    res.status(201).json({
      message: "Todo added successfully",
      data: task,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "something went wrong",
      status: false,
    });
  }
};
export const getAllTodoContoller = async (req, res) => {
  try {
    const getTodo = await NoteModel.find();

    res.status(201).json({
      message: "getAll Todo successfully",
      data: getTodo,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "something went wrong",
      status: false,
    });
  }
};

export const updateTodoContoller = async (req, res) => {
  const { id } = req.params;
  const { task1, task2 } = req.body;
  try {
    const updateTask = await NoteModel.findByIdAndUpdate(
      id,
      { task1, task2 },
      { new: true }
    );
    if (!updateTask) {
      return response
        .status(401)
        .json({ message: "Todo not found", status: false });
    }
    res.status(201).json({
      message: "Todo updated successfully",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "something went wrong",
      status: false,
    });
  }
};
export const deleteOneTodoContoller = async (req, res) => {
  const { id } = req.params;
  try {
    await NoteModel.findByIdAndDelete(id);

    res.status(201).json({
      message: "Todo deleted successfully",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "something went wrong",
      status: false,
    });
  }
};
export const deleteAllTodoContoller = async (req, res) => {
  try {
    await NoteModel.deleteMany();
    res.status(201).json({
      message: "All completed todos deleted successfully",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "something went wrong",
      status: false,
    });
  }
};
