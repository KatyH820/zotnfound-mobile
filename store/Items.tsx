import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    addItem(state, action) {
      state.unshift(action.payload);
    },
    deleteItem(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
    updateItem(state, action) {},
    initialize(state, action) {
      return action.payload;
    },
  },
});

export const itemsAction = itemsSlice.actions;
export default itemsSlice;
