import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "../features/ui/uiSlice.js";
import userSlice from "../features/user/userSlice.js";

const store = configureStore({
  reducer: {
    ui: uiSlice,
    user: userSlice,
  },
});

export default store;
