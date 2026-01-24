import { createSlice } from "@reduxjs/toolkit";
import { sigUpThunk } from "./auth.thunk";

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
      state.loading = true;
      state.user = payload;
    });
    builder.addCase(sigUpThunk.rejected, (state, { payload }) => {
      state.loading = true;
      state.error = payload;
    });
  },
});

const { reducer, actions } = authSlice;

const authReducer = reducer;

const {} = actions;

export { authReducer };
