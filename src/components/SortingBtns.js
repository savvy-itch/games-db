import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSortCategory, changeOrder } from '../features/sorting/sortingSlice';
import { sortByCategory } from '../features/games/gamesSlice';

const SORTING_OPTIONS = [
  'Rating',
  'Title',
  'Release Date'
]

export default function SortingBtns() {
  const sorting = useSelector(state => state.sorting);
  const dispatch = useDispatch();

  function handleSortCategoryChange(e) {
    // if it's the same category, reverse sorting order
    if (e.target.dataset.category === sorting.sortBy) {
      dispatch(changeOrder({ descendingOrder: !sorting.descendingOrder }));  
    } else {
      // change category
      dispatch(changeSortCategory({ sortBy: e.target.dataset.category }));
      dispatch(changeOrder({ descendingOrder: true }));
    }
    dispatch(sortByCategory({ sortBy: sorting.sortBy, descendingOrder: sorting.descendingOrder}));
  }

  return (
    <div className="flex justify-end my-4">
      {SORTING_OPTIONS.map(option => {
        return (
        <button key={option} className={`
        ${sorting.sortBy === option ? 'bg-cyan-600/75 border-cyan-600/75' : 'bg-stone-500/75 border-stone-500/75'}
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