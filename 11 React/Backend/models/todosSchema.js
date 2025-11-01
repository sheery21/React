import mongoose from "mongoose";

const todoSchema = mongoose.Schema(
  {
    task1: {
      type: String,
      require: true,
    },
    task2: {
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
  },
  {
    timestamps: true,
  }
);
todoSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const todoModels = mongoose.model("note", todoSchema);

export default todoModels;
