import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFilter, removeFilter } from './filterSlice';

export default function FilterListBtn({ filter, filterCategory }) {
  const filtersState = useSelector(state => state.filters);
  const dispatch = useDispatch();

  const isAdded = filtersState.selectedFilters.some(sf => sf[1] === filter);

  function handleClick() {
    if (isAdded) {
      dispatch(removeFilter({ selectedFilter: [filterCategory, filter] }));
    } else {
      dispatch(addFilter({ selectedFilter: [filterCategory, filter] }));
    }
  }

  return (
    <button
      className={`m-0.5 p-2 rounded border-solid border text-sm
      ${isAdded
        ? 'border-stone-900/75 bg-stone-400/75 hover:border-stone-900/75 hover:bg-stone-600/75'
        : 'border-stone-700/75 bg-stone-100/75 hover:border-stone-700/75 hover:bg-stone-200/75'
        }`}
      onClick={handleClick}
    >
      {filter}
    </button>
  );
}