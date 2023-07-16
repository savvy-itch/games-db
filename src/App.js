import React, { useEffect, useState } from 'react';
import { useGetGamesQuery, useLazyGetSearchQuery } from '../src/features/api/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import './index.css';

import Loading from './components/Loading';
import { setFetchedGames, setGames, sortByDefault } from './features/games/gamesSlice';
import { onPageChange } from './features/pagination/paginationSlice';
import Pagination from './components/Pagination'
import { changeOrder, changeSortCategory } from './features/sorting/sortingSlice';
import FilterSection from './features/filters/FilterSection';
import SortingBtns from './components/SortingBtns';
import Error from './components/Error';
import ThemeSwitch from './features/theme/ThemeSwitch';
import { FaSearch } from "react-icons/fa";
import { IoGameController } from 'react-icons/io5';
import GameCard from './features/games/GameCard';

// IoGameController

// light/dark theme toggle
// display search input below the filters
// single game page
// by default fetch games not older than 1993 
// dropdown menu of matches on search input
// add loaders between data fetching
// remove filterCategory from an array when dispatcihng removeFilter if it ends up not needed

const pageSize = 10;

function App() {
  const [paginatedGames, setPaginatedGames] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  // needed to determine when filtering whether new data should be fetched or not
  const [isSearch, setIsSearch] = useState(false);
  const pagination = useSelector(state => state.pagination);
  const gamesState = useSelector(state => state.games);
  const dispatch = useDispatch();

  const {
    data: games,
    isLoading: gamesLoading,
    isSuccess: gamesSuccess,
    isError: gamesError,
    error: gamesErrorData
  } = useGetGamesQuery();

  const [
    trigger, 
    { data: searchResult, 
      isSuccess: searchSuccess, 
      isError: searchError,
      error: searchErrorData 
    }] = useLazyGetSearchQuery({}, { enabled: false }); // prevent automatic re-fetching

  useEffect(() => {
    if (games && games.length > 0) {
      // store fetched games
      dispatch(setFetchedGames({ fetchedGamesList: games}));
      // store games for displaying
      dispatch(setGames({ gamesList: games}));
      dispatch(changeSortCategory({ sortBy: 'Rating' }));
      dispatch(changeOrder({ descendingOrder: true }));
    }
  }, [games, dispatch]);

  useEffect(() => {
    if (searchResult) {
      const nestedSearchResults = searchResult.map(obj => obj.game);
      // store fetched games
      dispatch(setFetchedGames({ fetchedGamesList: nestedSearchResults}));
      dispatch(setGames({ gamesList: nestedSearchResults}));
      dispatch(sortByDefault());
    }
  }, [searchResult, dispatch]);

  useEffect(() => {
    function paginateGames(results) {
      let gamesForCurrentPage;
      // if it's the 1st page
      if (pagination.currentPage === 1) {
        gamesForCurrentPage = results.slice(0, pageSize);
      } else {
        // subsequent pages
        gamesForCurrentPage = results.slice((pagination.currentPage - 1) * pageSize, pagination.currentPage * pageSize);
      }
      setPaginatedGames(gamesForCurrentPage);
    }

    if (gamesState.gamesList) {
      paginateGames(gamesState.gamesList);
    }
  }, [gamesState.gamesList, pagination.currentPage]);

  function handleSearchInputChange(e) {
    setSearchInput(e.target.value);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    setIsSearch(true);
    trigger(searchInput);
    dispatch(onPageChange({ currentPage: 1 }));
    setSearchInput('');
    dispatch(changeSortCategory({ sortBy: 'Rating' }));
    dispatch(changeOrder({ descendingOrder: true }));
  }

  let content;

  if (gamesLoading) {
    content = <Loading />;
  } else if (searchSuccess && paginatedGames.length === 0) {
    content = (
      <div className="flex min-h-[50vh] justify-center items-center">
        <h2 className="text-2xl">No matches were found</h2>
      </div>)
  } else if (gamesSuccess || searchSuccess) {
    content = (
    <>
      <FilterSection isSearch={isSearch} />
      <SortingBtns />
      <div className="grid md:grid-cols-2 grid-cols-1 gap-7">
        {paginatedGames.map(game => {return <GameCard key={game.id} game={game} />})}
      </div>
      <Pagination pages={Math.ceil(gamesState.gamesList?.length / pageSize)} />
    </>)
  } else if (gamesError || searchError) {
    const errorData = gamesError ? gamesErrorData : searchErrorData;
    return <Error error={errorData.message} />;
  }

// #2c3867 - light blue
// #171e3a - dark blue
// #ff0056 - pink

  return (
    <div className="App flex flex-col items-center bg-slate-100 dark:bg-slate-800 transition-colors box-border">
      <div className="flex flex-col sm:flex-row justify-between md:w-9/12 w-11/12 items-center my-4">
        <h1 className="flex items-center text-orange-600 text-center text-4xl	font-bold">
          Ga<IoGameController className="self-end" />es DB
        </h1>
        <div className="flex my-3 w-full sm:w-auto justify-between">
          <form className="flex">
            <input className="rounded-l-md border-l-2 border-t-2 border-b-2 border-stone-400 transition-colors px-2 py-1 outline-none focus:border-sky-500/75" type="text" 
              value={searchInput} 
              onChange={handleSearchInputChange} 
              onSubmit={handleSearchSubmit}
              placeholder="search" />
            <button className="rounded-r-md bg-sky-500/75 text-white font-bold px-3 py-1 transition-colors flex items-center hover:bg-sky-600/75" 
              onClick={handleSearchSubmit}
            >
              <FaSearch />
            </button>
          </form>
          <ThemeSwitch />
        </div>
      </div>
      <div className="md:w-9/12 bg-slate-200 dark:bg-slate-900 p-3 min-h-screen rounded">
        {content}
      </div>
    </div>
  );
}

export default App;