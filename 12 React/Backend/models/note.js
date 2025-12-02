import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    note: {
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
