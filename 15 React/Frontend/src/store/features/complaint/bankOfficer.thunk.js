import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getBankOfficerComplaints = createAsyncThunk(
  "/api/bankOfficer/getComplaints",
  async (_, { rejectWithValue }) => {
    try {
      const url = import.meta.env
        .VITE_LOCAL_HOST_OTP_GET_ALL_COMPLAINTS_BY_BANK_OFFICR;
      const token = localStorage.getItem("token");

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" },
      );
    }
  },
);

export const updateComplaintStatus = createAsyncThunk(
  "/api/bankOfficer/updateComplaint",
  async ({ Cid, status }, { rejectWithValue }) => {
    try {
      const url = import.meta.env
        .VITE_LOCAL_HOST_OTP_UPDATE_ALL_COMPLAINTS_BY_BANK_OFFICR;
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${url}${Cid}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" },
      );
    }
  },
);
