import mongoose from "mongoose";

export const dbConnect = () => {
  const URI = process.env.MONGODB_URI;

  mongoose
    .connect(URI)
    .then(() => console.log("mongoDB Connected!!"))
    .catch((error) => console.log("mongoDB Error", error.message));
};