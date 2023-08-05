import React, { useEffect } from 'react';
import { useLazyGetSearchQuery } from '../features/api/apiSlice';
import { setFetchedGames, setGames, setIsSearch, sortByCategory } from '../features/games/gamesSlice';
import { clearFilters } from '../features/filters/filterSlice';
import { onPageChange } from '../features/pagination/paginationSlice';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate, } from 'react-router-dom';
import { IoGameController } from 'react-icons/io5';
import SearchForm from '../features/search/SearchForm';
import ThemeSwitch from '../features/theme/ThemeSwitch';

export default function Navbar() {
  const sorting = useSelector(state => state.sorting);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [
    trigger, 
    { data: searchResult, 
      isSuccess: searchSuccess, 
      isError: searchError,
      error: searchErrorData 
    }] = useLazyGetSearchQuery({}, { enabled: false }); // prevent automatic re-fetching

  useEffect(() => {
    if (searchResult) {
      const nestedSearchResults = searchResult.map(obj => obj.game);
      // store fetched games
      dispatch(setFetchedGames({ fetchedGamesList: nestedSearchResults}));
      dispatch(setGames({ gamesList: nestedSearchResults}));
      dispatch(sortByCategory({ sortBy: sorting.sortBy, descendingOrder: sorting.descendingOrder }));
    }
  }, [searchResult, dispatch, sorting]);

  function handleSearchSubmit(searchInput) {
    dispatch(setIsSearch({isSearch: true}));
    dispatch(clearFilters()); 
    trigger(searchInput);
    dispatch(onPageChange({ currentPage: 1 }));
    navigate('/'); // redirect to the home page 
  }

  function passHandleSearchSubmit(searchInput) {
    handleSearchSubmit(searchInput);
  }

  function getDefaultGames() {
    dispatch(setIsSearch({isSearch: false}));
  }

  return (
    <div className="flex justify-center py-4 bg-slate-100 dark:bg-slate-800 transition-colors">
      <div className="flex flex-col sm:flex-row justify-between md:w-9/12 w-11/12 items-center">
        <Link to="/" onClick={getDefaultGames}>
          <h1 className="flex items-center text-orange-600 text-center text-4xl	font-bold">
            Ga<IoGameController className="self-end" />es Vault
          </h1>
        </Link>
        <div className="flex my-3 w-full sm:w-auto justify-between">
          <SearchForm onSubmit={passHandleSearchSubmit} />
          <ThemeSwitch />
        </div>
      </div>
    </div>
  )
}