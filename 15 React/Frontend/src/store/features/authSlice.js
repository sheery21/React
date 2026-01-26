import { createSlice } from "@reduxjs/toolkit";
import {
  signUpWihtBank_Officer,
  signUpWith_Admin,
  sigUpThunk,
} from "./auth.thunk";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    user: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sigUpThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(sigUpThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    });
    builder.addCase(sigUpThunk.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(signUpWihtBank_Officer.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signUpWihtBank_Officer.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    });
    builder.addCase(signUpWihtBank_Officer.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(signUpWith_Admin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signUpWith_Admin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    });
    builder.addCase(signUpWith_Admin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

const { reducer, actions } = authSlice;

const authReducer = reducer;

const {} = actions;

export { authReducer };
