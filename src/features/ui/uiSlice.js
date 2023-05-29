import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    onMode: (state, action) => {
      state.mode = action.payload;
    },
    toggleMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
  },
});

export const { loadInitialState, onMode, toggleMode } = uiSlice.actions;

export default uiSlice.reducer;
