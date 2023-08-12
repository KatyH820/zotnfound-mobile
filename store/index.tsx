import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./theme";
import itemsSlice from "./Items";
export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    items: itemsSlice.reducer,
  },
});
