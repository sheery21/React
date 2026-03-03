import { createSlice } from "@reduxjs/toolkit";
import {
  getBankOfficerComplaints,
  updateComplaintStatus,
} from "./bankOfficer.thunk";

const bankOfficerSlice = createSlice({
  name: "bankOfficer",
  initialState: {
    loading: false,
    complaints: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBankOfficerComplaints.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBankOfficerComplaints.fulfilled, (state, payload) => {
        state.loading = false;
        state.complaints = payload.payload.data;
      })
      .addCase(getBankOfficerComplaints.rejected, (state, payload) => {
        state.loading = false;
        state.error = payload.payload?.message;
      })
      .addCase(updateComplaintStatus.fulfilled, (state, payload) => {
        const updated = payload.payload.data;
        state.complaints = state.complaints.map((comp) =>
          comp._id === updated._id ? updated : comp,
        );
      });
  },
});

// export const { resetComplaintState } = complaintSlice.actions;

// export default complaintSlice.reducer;

const { reducer, actions } = bankOfficerSlice;

const {} = actions;

export const bankOfficerReducer = reducer;
