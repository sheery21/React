import express from "express"


const noteRoute = express.Router()


noteRoute.post("/create-note", creteNote)