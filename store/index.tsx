import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./theme";
export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
  },
});
