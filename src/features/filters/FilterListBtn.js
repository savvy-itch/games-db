import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addFilter, removeFilter } from './filterSlice';
import { filterGames } from '../games/gamesSlice';

// fetched data should remain untouched and be stored in a slice
// for filtering/sorting create a copy of fetched list

export default function FilterListBtn({ filter, filterCategory }) {
  const [isAdded, setIsAdded] = useState(false);
  const filtersState = useSelector(state => state.filters);
  const dispatch = useDispatch();

  // const memoizedDispatch = useCallback(() => {
  //   dispatch(filterGames({ filters: filtersState.selectedFilters }));
  // }, [dispatch, filtersState.selectedFilters]);

  function handleClick() {
    setIsAdded(!isAdded);
    if (isAdded) {
      dispatch(removeFilter({ selectedFilter: [filterCategory, filter] }));
    } else {
      dispatch(addFilter({ selectedFilter: [filterCategory, filter] }));
    }
    // dispatch(filterGames({ filters: filtersState.selectedFilters }));
  }

  // useEffect(() => {
  //   dispatch(filterGames({ filters: filtersState.selectedFilters }));
  // }, [dispatch, filtersState.selectedFilters]);

  // if filter was removed by AppliedFilterBtn click, remove FilterListBtn highlight
  useEffect(() => {
    if (filtersState.selectedFilters.find(sf => sf[1] === filter)) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }
  }, [filtersState.selectedFilters, filter]);

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