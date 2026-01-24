import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sigUpThunk = createAsyncThunk(
  "auth/signUp",
  async (payload, { rejectWithValue }) => {
    try {
      console.log("payload", payload);
      const url = import.meta.env.VITE_LOCAL_HOST_SIGNUP_API;
      console.log("url", url);

      const res = await axios.post(url, payload);
      console.log("response", res);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
