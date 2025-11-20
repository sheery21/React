import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

export const dbConnect = () => {
    console.log("process.env.MONGODB_URI" ,process.env.MONGODB_URI);
    
  const URI = process.env.MONGODB_URI;
  mongoose
    .connect(URI)
    .then(() => console.log("mongoDB Connected!!"))
    .catch((error) => console.log("mongoDB Error",error.message));
};
