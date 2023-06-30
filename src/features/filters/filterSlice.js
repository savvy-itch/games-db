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
      let appliedFilters = [];
      appliedFilters = [...state.selectedFilters, action.payload.selectedFilter];
      return {...state, selectedFilters: appliedFilters}
    },
    removeFilter(state, action) {
      let appliedFilters = [];
      appliedFilters = [...state.selectedFilters].filter(filter => filter !== action.payload.selectedFilter);
      return {...state, selectedFilters: appliedFilters}
    },
  }
});

export const { addFilter, removeFilter } = filterSlice.actions;
export default filterSlice.reducer;