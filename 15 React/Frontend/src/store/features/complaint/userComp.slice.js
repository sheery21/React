import { createSlice } from "@reduxjs/toolkit";
import { build } from "vite";

const complaintSlice = createSlice({
    name : "complaint",
    initialState : {
        loading : false,
        error : null,
        user : null,
        success : false,
    },
    reducers: {},
    extraReducers : (builder) =>{
        builder 
        .addCase()
    }
})