import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    task1: {
      type: String,
    },
    task2: {
      type: String,
    },
    hashtags: {
      type: String,
    },
    createdBy: {
      type: String,
    },
  },
  { timestamps: true }
);

const NoteModel = mongoose.model("note", noteSchema);

export default NoteModel;
