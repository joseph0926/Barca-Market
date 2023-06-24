import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UIState = {
  isSidebarOpen: boolean;
  mode: "dark" | "light" | string;
};

const initialState: UIState = {
  isSidebarOpen: false,
  mode: "dark",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    loadInitialState: (state) => {
      if (typeof window !== "undefined") {
        const mode = window.localStorage.getItem("theme") || "dark";
        state.mode = mode;
      }
    },
    onMode: (state, action: PayloadAction<string>) => {
      state.mode = action.payload;

      if (typeof window !== "undefined") {
        window.localStorage.setItem("theme", state.mode);
      }
    },
    toggleMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";

      if (typeof window !== "undefined") {
        window.localStorage.setItem("theme", state.mode);
      }
    },
  },
});

export const { loadInitialState, onMode, toggleMode } = uiSlice.actions;

export default uiSlice.reducer;
