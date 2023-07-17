import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSortCategory, changeOrder } from '../features/sorting/sortingSlice';
import { sortByCategory } from '../features/games/gamesSlice';
import { BiSolidDownArrow } from "react-icons/bi";

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
    if (e.currentTarget.dataset.category === sorting.sortBy) {
      dispatch(changeOrder({ descendingOrder: !sorting.descendingOrder }));  
    } else {
      // change category
      dispatch(changeSortCategory({ sortBy: e.currentTarget.dataset.category }));
      dispatch(changeOrder({ descendingOrder: true }));
    }
  }

  useEffect(() => {
    dispatch(sortByCategory({ sortBy: sorting.sortBy, descendingOrder: sorting.descendingOrder }));
  }, [sorting.sortBy, sorting.descendingOrder, dispatch]);

  return (
    <div className="flex justify-end my-4">
      {SORTING_OPTIONS.map(option => {
        return (
        <button key={option} className={`
        ${sorting.sortBy === option ? 'bg-cyan-600/75 border-cyan-600/75' : 'bg-stone-500/75 border-stone-500/75'}
        flex items-center rounded-lg border text-sm text-white py-0.5 px-2 mx-1 min-w-11 transition-all`}
        onClick={handleSortCategoryChange}
        data-category={option}
        >
          {option}
          {sorting.sortBy === option 
            && <BiSolidDownArrow className={`transform ml-0.5 transition-transform 
            ${sorting.descendingOrder ? 'rotate-0' : 'rotate-180'}`} />
          }
        </button>)
      })}
    </div>
  )
}