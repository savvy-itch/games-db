import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortBy: 'Rating',
};

const sortingSlice = createSlice({
  name: "sorting",
  initialState,
  reducers: {
    changeSortCategory(state, action) {
      return {...state, sortBy: action.payload.sortBy}
    },
    
  }
})

export const { changeSortCategory } = sortingSlice.actions;
export default sortingSlice.reducer;