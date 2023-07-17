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
import { IoGameController } from 'react-icons/io5';
import GameCard from './features/games/GameCard';
import SearchForm from './features/search/SearchForm';
import { clearFilters } from './features/filters/filterSlice';

// light/dark theme toggle
// single game page
// dropdown menu of matches on search input
// add loaders between data fetching
// remove filterCategory from an array when dispatcihng removeFilter if it ends up not needed

const pageSize = 10;

function App() {
  const [paginatedGames, setPaginatedGames] = useState([]);
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

  function handleSearchSubmit(searchInput) {
    setIsSearch(true);
    dispatch(clearFilters());
    trigger(searchInput);
    dispatch(onPageChange({ currentPage: 1 }));
    dispatch(changeSortCategory({ sortBy: 'Rating' }));
    dispatch(changeOrder({ descendingOrder: true }));
  }

  function passHandleSearchSubmit(searchInput) {
    handleSearchSubmit(searchInput);
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

  return (
    <div className="App flex flex-col items-center bg-slate-100 dark:bg-slate-800 transition-colors box-border">
      <div className="flex flex-col sm:flex-row justify-between md:w-9/12 w-11/12 items-center my-4">
        <h1 className="flex items-center text-orange-600 text-center text-4xl	font-bold">
          Ga<IoGameController className="self-end" />es DB
        </h1>
        <div className="flex my-3 w-full sm:w-auto justify-between">
          <SearchForm onSubmit={passHandleSearchSubmit} />
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