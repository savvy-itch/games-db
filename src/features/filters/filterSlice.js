import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // currentFilterTab: 'Platforms',
  selectedFilters: [],
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    addFilter(state, action) {
      return state
    },
    removeFilter(state, action) {
      return state
    },
  }
});

export const { addFilter, removeFilter } = filterSlice.actions;
export default filterSlice.reducer;