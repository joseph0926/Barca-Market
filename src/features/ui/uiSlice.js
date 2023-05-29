import { createSlice } from "@reduxjs/toolkit";
import { theme } from "../../utils/themeConfig.js";

const initialState = {
  isSidebarOpen: false,
  onMode: theme.initialColorMode,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {},
});

export default uiSlice.reducer;
