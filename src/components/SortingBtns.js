import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSortCategory } from '../features/sorting/sortingSlice';

const SORTING_OPTIONS = [
  'Rating',
  'Title',
  'Release Date'
]

export default function SortingBtns() {
  const sortCategory = useSelector(state => state.sorting.sortBy);
  const dispatch = useDispatch();

  function handleSortCategoryChange(e) {
    dispatch(changeSortCategory({ sortBy: e.target.dataset.category}));
  }

  return (
    <div className="flex justify-end my-4">
      {SORTING_OPTIONS.map(option => {
        return (
        <button key={option} className={`
        ${sortCategory === option ? 'bg-cyan-600/75 border-cyan-600/75' : 'bg-stone-500/75 border-stone-500/75'}
        rounded-lg border text-sm text-white py-0.5 px-2 mx-1 transition-colors`}
        onClick={handleSortCategoryChange}
        data-category={option}
        >
          {option}
        </button>)
      })}
    </div>
  )
}