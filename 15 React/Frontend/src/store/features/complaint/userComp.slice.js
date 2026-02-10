import { createSlice } from "@reduxjs/toolkit";
import { userThunk } from "./userComp.thunk";

const complaintSlice = createSlice({
  name: "complaint",
  initialState: {
    loading: false,
    error: null,
    complaintId: null,
    message: null,
    success: false,
  },
  reducers: {
    resatComplaintState: (state) => {
      state.loading = false;
      state.error = null;
      state.complaintId = null;
      state.message = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(userThunk.pending, (state, payload) => {
        state.loading = false;
        state.success = payload.payload.state;
        state.complaintId = payload.payload.complaintId;
        state.message = payload.payload.message;
      })
      .addCase(userThunk.pending, (state, payload) => {
        state.loading = false;
        state.error = payload.payload?.message || "something went worng";
        state.success = false;
      });
  },
});

export const { resetComplaintState } = complaintSlice.actions;

export default complaintSlice.reducer;
