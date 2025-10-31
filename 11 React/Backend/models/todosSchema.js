import mongoose from "mongoose";

const todoSchema  = mongoose.Schema({
  task: {
    type: String,
    require: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  crieteAt: {
    type: Date,
    default: Date.now,
  },
});

const todoModels  = mongoose.model("note", todoSchema );

export default todoModels ;
