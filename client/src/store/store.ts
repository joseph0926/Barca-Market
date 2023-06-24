import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "../features/ui/uiSlice";
import userSlice from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    ui: uiSlice,
    user: userSlice,
  },
});

export type ApplicationState = ReturnType<typeof store.getState>;
export type ApplicationDispatch = typeof store.dispatch;

export default store;
