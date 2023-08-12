import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    addItem(state, action) {},
    deleteItem(state, action) {},
    updateItem(state, action) {},
  },
});

export const itemsAction = itemsSlice.actions;
export default itemsSlice;
