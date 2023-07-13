import React, { useEffect, useState } from 'react';
import { useGetGamesQuery, useLazyGetSearchQuery } from '../src/features/api/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

import Loading from './components/Loading';
import { setFetchedGames, setGames, sortByDefault } from './features/games/gamesSlice';
import { onPageChange } from './features/pagination/paginationSlice';
import Pagination from './components/Pagination'
import { changeOrder, changeSortCategory } from './features/sorting/sortingSlice';
import FilterSection from './features/filters/FilterSection';
import SortingBtns from './components/SortingBtns';
import ThemeToggle from './features/theme/ThemeToggle';
import Error from './components/Error';
import { unixToDate } from './helpers';

// light/dark theme toggle
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
      <div className="grid grid-cols-2 gap-7">
        {paginatedGames.map((game) => {
          return (
            <div className="flex" key={game.id}>
              <img className="aspect-square object-none w-1/5" src={game.cover?.url} alt={game.name} />
              <div className="ml-2">
                <p className="text-lg font-bold">{game.name}</p>
                <p>Rating: {Math.round(game.total_rating)}/100</p>
                <p className="text-sm text-slate-600">
                  {game.platforms.map((platform, index) => {
                    let name = '';
                    name += platform.name;
                    if (index < game.platforms.length - 1) {
                      name += '/';
                    }
                    return name;
                  })}
                </p>
                <p>{unixToDate(game.first_release_date)}</p>
              </div>
            </div>
          );
        })}
      </div>
      <Pagination pages={Math.ceil(gamesState.gamesList?.length / pageSize)} />
    </>)
  } else if (gamesError || searchError) {
    const errorData = gamesError ? gamesErrorData : searchErrorData;
    return <Error error={errorData.message} />;
  }

  return (
    <div className="App flex flex-col items-center bg-slate-100 dark:bg-slate-800">
      <ThemeToggle />
      <div className="w-9/12 bg-slate-200 p-2 min-h-screen">
        <h1 className="text-orange-600 text-center text-4xl	font-bold">Games DB</h1>
        <form className="flex my-3">
          <input className="rounded outline outline-2 outline-stone-400 transition-colors px-2 py-0.5 focus:outline-sky-600" type="text" 
            value={searchInput} 
            onChange={handleSearchInputChange} 
            onSubmit={handleSearchSubmit}
            placeholder="search" />
          <button className="rounded bg-sky-500/75 text-white font-bold px-3 py-1 ml-3 transition-colors flex hover:bg-sky-600" 
            onClick={handleSearchSubmit}
          >
            search
          </button>
        </form>
        {content}
      </div>
    </div>
  );
}

export default App;