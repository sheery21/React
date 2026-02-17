import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userThunk = createAsyncThunk(
  "/api/complaint/generate",
  async (formData, { rejectWithValue }) => {
    try {
      const url = import.meta.env.VITE_LOCAL_HOST_COMPLIAINT_WITH_USER_API;
      const token = localStorage.getItem("token");
      const res = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

export const getAllComplaint = createAsyncThunk(
  "/api/compalit/getAllComplaint",
  async (payload, { rejectWithValue }) => {
      const url = import.meta.env.VITE_LOCAL_HOST_COMPLIAINT_WITH_USER_API;

  },
);
