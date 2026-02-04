import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userThunk = createAsyncThunk(
  "/api/complaint/generate",
  async (payload, { rejectWithValue }) => {
    try {
      const url = import.meta.env;
      const res = await axios.post(url, payload);

      return res.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message, status: false });
      }
    }
  },
);
