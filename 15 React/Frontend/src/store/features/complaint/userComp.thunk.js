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

export const getAllComplaintThunk = createAsyncThunk(
  "/api/complaint/getAllComplaint",
  async (payload, { rejectWithValue }) => {
    try {
      const url = import.meta.env.VITE_LOCAL_HOST_GET_ALL_COMPLAINT_API;
      const token = localStorage.getItem("token");
      console.log("token", token);

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message, state: false });
      }
    }
  },
);

