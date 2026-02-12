import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./features/auth/authSlice";
import { complaintReducer } from "./features/complaint/userComp.slice";
const store = configureStore({
  reducer: {
    authReducer,
    " complaint": complaintReducer,
  },
});

export default store;
