import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
      const {selectedFilter} = action.payload;
      let appliedFilters = [];
      appliedFilters = [...state.selectedFilters].filter(sf => sf[1] !== selectedFilter[1]);
      return {...state, selectedFilters: appliedFilters}
    },
    updateMinRatingFilter(state, action) {
      return {...state, selectedMinRating: action.payload.selectedMinRating}
    },
    updateMaxRatingFilter(state, action) {
      return {...state, selectedMaxRating: action.payload.selectedMaxRating}
    },
  }
});

export const { addFilter, removeFilter, updateMinRatingFilter, updateMaxRatingFilter } = filterSlice.actions;
export default filterSlice.reducer;