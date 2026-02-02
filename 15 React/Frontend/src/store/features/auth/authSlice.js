import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import {
  adminOtp,
  Bank_OfficerOtp,
  logIn_Thunk,
  resetOtp,
  signUpWihtBank_Officer,
  signUpWith_Admin,
  sigUpThunk,
  userOtp,
} from "./auth.thunk";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    user: null,
    success: false,
    otpVerified: false,
    token: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sigUpThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(sigUpThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.success = true;
    });
    builder.addCase(sigUpThunk.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    });

    builder.addCase(signUpWihtBank_Officer.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(signUpWihtBank_Officer.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.success = true;
    });
    builder.addCase(signUpWihtBank_Officer.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    });
    builder.addCase(signUpWith_Admin.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(signUpWith_Admin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.success = true;
    });
    builder.addCase(signUpWith_Admin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    });
    builder.addCase(logIn_Thunk.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(logIn_Thunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.token = payload;
      state.success = true;
    });
    builder.addCase(logIn_Thunk.rejected, (state, { payload }) => {
      state.loading = true;
      state.error = payload;
      state.success = false;
    });
    builder.addCase(userOtp.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.otpVerified = false;
    });
    builder.addCase(userOtp.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.otpVerified = true;
    });
    builder.addCase(userOtp.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.otpVerified = false;
    });
    builder.addCase(Bank_OfficerOtp.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.otpVerified = false;
    });
    builder.addCase(Bank_OfficerOtp.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.otpVerified = true;
    });
    builder.addCase(Bank_OfficerOtp.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.otpVerified = false;
    });
    builder.addCase(adminOtp.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.otpVerified = false;
    });
    builder.addCase(adminOtp.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.otpVerified = true;
    });
    builder.addCase(adminOtp.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.otpVerified = false;
    });
    builder.addCase(resetOtp.pending, (state) => {
      state.loading = false;
      state.error = null;
      state.otpVerified = false;
    });
    builder.addCase(resetOtp.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.otpVerified = true;
    });
    builder.addCase(resetOtp.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.otpVerified = false;
    });
  },
});

const { reducer, actions } = authSlice;

const authReducer = reducer;

const {} = actions;

export { authReducer };
