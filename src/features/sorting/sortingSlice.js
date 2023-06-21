import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortBy: 'Rating',
  descendingOrder: true,
};

const sortingSlice = createSlice({
  name: "sorting",
  initialState,
  reducers: {
    changeSortCategory(state, action) {
      return {...state, sortBy: action.payload.sortBy}
    },
    changeOrder(state, action) {
      return {...state, descendingOrder: action.payload.descendingOrder}
    },
  }
})

export const { changeSortCategory, changeOrder } = sortingSlice.actions;
export default sortingSlice.reducer;