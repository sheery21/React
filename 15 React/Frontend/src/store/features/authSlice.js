import { createSlice } from "@reduxjs/toolkit";
import { sigUpThunk } from "./auth.thunk";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    user: null,
    token: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sigUpThunk.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(sigUpThunk.fulfilled, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(sigUpThunk.rejected, (state, { payload }) => {
      state.loading = true;
    });
  },
});

const { reducer, actions } = authSlice;

const authReducer = reducer;

const {} = actions;

export { authReducer };
