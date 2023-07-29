import React from 'react';
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { removeFilter, updateMaxRatingFilter, updateMinRatingFilter } from './filterSlice';

export default function AppliedFilterBtn({ filter, filterCategory, triggerFn }) {
  const filtersState = useSelector(state => state.filters);
  const dispatch = useDispatch();

  function handleFilterRemoval() {
    if (filtersState.selectedMinRating !== 0) {
      dispatch(updateMinRatingFilter({selectedMinRating: 0}))
    } else if (filtersState.selectedMaxRating !== 100) {
      dispatch(updateMaxRatingFilter({selectedMaxRating: 100}))
    } else {
      dispatch(removeFilter({selectedFilter: [filterCategory, filter]}))
    }
  }

  if (filtersState.selectedMinRating !== 0) {
    return (
      <button className="m-0.5 p-2 rounded text-sm bg-indigo-700 text-white flex items-center"
        onClick={handleFilterRemoval}
      >
        Min rating: {filtersState.selectedMinRating}
        <IoClose className="font-bold ml-2 h-5 w-5" />
      </button>
    )  
  }

  if (filtersState.selectedMaxRating !== 100) {
    return (
      <button className="m-0.5 p-2 rounded text-sm bg-indigo-700 text-white flex items-center"
        onClick={handleFilterRemoval}
      >
        Max rating: {filtersState.selectedMaxRating}
        <IoClose className="font-bold ml-2 h-5 w-5" />
      </button>
    )  
  }

  if (filterCategory) {
    return (
      <button className="m-0.5 p-2 rounded text-sm bg-indigo-700 text-white flex items-center"
        onClick={handleFilterRemoval}
      >
        {filter}
        <IoClose className="font-bold ml-2 h-5 w-5" />
      </button>
    )
  }
}