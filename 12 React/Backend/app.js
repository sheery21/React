import express from "express"
import  {dbConnect} from "./config/db.js";
import dotenv from "dotenv"
import authRouthe from "./routes/auth.js";
import cors from "cors";

dotenv.config()

export const app = express()
const PORT = process.env.PORT || 5000;

dbConnect()

//All Routes
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use("/api/auth",authRouthe)
app.get("/" , (req , res) =>{
    res.json({
        message : "SERVER RUNNING"
    })
})


app.listen(PORT ,()=> console.log(`server running on http://localhost:${PORT}`))