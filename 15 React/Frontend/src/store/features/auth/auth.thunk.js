import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// SignUp Thunk
export const sigUpThunk = createAsyncThunk(
  "auth/signUp",
  async (payload, { rejectWithValue }) => {
    try {
      const url = import.meta.env.VITE_LOCAL_HOST_SIGNUP_API;
      const res = await axios.post(url, payload);

      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message, status: false });
      }
    }
  },
);

export const signUpWihtBank_Officer = createAsyncThunk(
  "auth/signUp/Bank_Officer",
  async (payload, { rejectWithValue }) => {
    try {
      const url = import.meta.env.VITE_LOCAL_HOST_SIGNUP_WITH_BANK_OFFICER_API;
      const res = await axios.post(url, payload);

      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message, status: false });
      }
    }
  },
);

export const signUpWith_Admin = createAsyncThunk(
  "auth/signUp/admin",
  async (payload, { rejectWithValue }) => {
    try {
      const url = import.meta.env.VITE_LOCAL_HOST_SIGNUP_WITH_ADMIN_API;
      const res = await axios.post(url, payload);

      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message, status: false });
      }
    }
  },
);

// LogIn Thunk

export const logIn_Thunk = createAsyncThunk(
  "/api/auth/logIn",
  async (payload, { rejectWithValue }) => {
    try {
      const url = import.meta.env.VITE_LOCAL_HOST_LOGIN_API;
      const res = await axios.post(url, payload);
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message, status: false });
      }
    }
  },
);

export const userOtp = createAsyncThunk(
  "/api/auth/verify-otp",
  async (payload, { rejectWithValue }) => {
    try {
      const url = import.meta.env.VITE_LOCAL_HOST_OTP_VERIFY_API;
      const res = await axios.post(url, payload);
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue({ message: error.message, status: false });
      }
    }
  },
);

export const Bank_OfficerOtp = createAsyncThunk(
  "/api/auth/verify/bank_Officer-otp",
  async (payload, { rejectWithValue }) => {
    try {
      const url = import.meta.env.VITE_LOCAL_HOST_OTP_VERIFY_BANK_OFFICER_API;
      const res = await axios.post(url, payload);
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue({ message: error.message, status: false });
      }
    }
  },
);

export const adminOtp = createAsyncThunk(
  "/api/auth/verify/admin-otp",
  async (payload, { rejectWithValue }) => {
    try {
      const url = import.meta.env.VITE_LOCAL_HOST_OTP_VERIFY_ADMIN_API;
      const res = await axios.post(url, payload);
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue({ message: error.message, status: false });
      }
    }
  },
);

export const resetOtp = createAsyncThunk(
  "/api/auth/resend-otp",
  async (payload, { rejectWithValue }) => {
    try {
      const url = import.meta.env.VITE_LOCAL_HOST_RESEND_OTP_API;
      const res = await axios.post(url, payload);
      return res;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  },
);
