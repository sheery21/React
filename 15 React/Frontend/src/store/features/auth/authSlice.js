import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { signUpWihtBank_Officer, signUpWith_Admin, sigUpThunk } from "./auth.thunk";


const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    user: null,
    success: false,
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
  },
});

const { reducer, actions } = authSlice;

const authReducer = reducer;

const {} = actions;

export { authReducer };
