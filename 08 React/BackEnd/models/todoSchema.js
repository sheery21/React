import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  task: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const todoModels = mongoose.model("Todo" ,todoSchema);

export default todoModels