import React from 'react';
import { IoClose } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { removeFilter, updateMaxRatingFilter, updateMinRatingFilter } from './filterSlice';

export default function AppliedFilterBtn({ filter, minRating, maxRating }) {
  const dispatch = useDispatch();

  if (minRating) {
    return (
      <button className="m-0.5 p-2 rounded text-sm bg-indigo-700 text-white flex items-center"
        onClick={() => dispatch(updateMinRatingFilter({selectedMinRating: ''}))}
      >
        Min rating: {minRating}
        <IoClose className="font-bold ml-2 h-5 w-5" />
      </button>
    )  
  }

  if (maxRating) {
    return (
      <button className="m-0.5 p-2 rounded text-sm bg-indigo-700 text-white flex items-center"
        onClick={() => dispatch(updateMaxRatingFilter({selectedMaxRating: ''}))}
      >
        Max rating: {maxRating}
        <IoClose className="font-bold ml-2 h-5 w-5" />
      </button>
    )  
  }

  return (
    <button className="m-0.5 p-2 rounded text-sm bg-indigo-700 text-white flex items-center"
      onClick={() => dispatch(removeFilter({selectedFilter: filter}))}
    >
      {filter}
      <IoClose className="font-bold ml-2 h-5 w-5" />
    </button>
  )
}