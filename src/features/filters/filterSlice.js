import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // currentFilterTab: 'Platforms',
  selectedFilters: [],
  selectedMinRating: '',
  selectedMaxRating: ''
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
    addMinRatingFilter(state, action) {
      return {...state, selectedMinRating: action.payload.selectedMinRating}
    },
    addMaxRatingFilter(state, action) {
      return {...state, selectedMaxRating: action.payload.selectedMaxRating}
    },
  }
});

export const { addFilter, removeFilter, addMinRatingFilter, addMaxRatingFilter } = filterSlice.actions;
export default filterSlice.reducer;