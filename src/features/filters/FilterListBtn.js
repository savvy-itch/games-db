import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addFilter, removeFilter } from './filterSlice';

export default function FilterListBtn({ filter }) {
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useDispatch();

  function handleClick(e) {
    setIsAdded(!isAdded);
    if (isAdded) {
      dispatch(removeFilter({selectedFilter: e.target.textContent}));
    } else {
      dispatch(addFilter({selectedFilter: e.target.textContent}));
    }
  }

  return (
    <button className={`m-0.5 p-2 rounded border-solid border text-sm
      ${isAdded 
        ? 'border-stone-900/75 bg-stone-400/75 hover:border-stone-900/75 hover:bg-stone-500/75' 
        : 'border-stone-700/75 bg-stone-100/75 hover:border-stone-700/75 hover:bg-stone-200/75' }`}
      onClick={handleClick}
    >
      {filter}
    </button>
  )
}
