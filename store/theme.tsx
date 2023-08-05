import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    dark: false,
    status: "dark",
  },
  reducers: {
    toggle(state, action) {
      state.dark = !state.dark;
      if (state.dark) {
        state.status = "light";
      } else {
        state.status = "dark";
      }
    },
  },
});

export const themeAction = themeSlice.actions;
export default themeSlice;
