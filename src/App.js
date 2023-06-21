import React, { useEffect, useState } from 'react';
import Loading from './components/Loading';
import './App.css';
import { useGetGamesQuery, useLazyGetSearchQuery } from '../src/features/api/apiSlice';
import { onPageChange } from './features/pagination/paginationSlice';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from './components/Pagination';
import Error from './components/Error';
import SortingBtns from './components/SortingBtns';
import { sortByDefault } from './features/games/gamesSlice';
import { changeOrder, changeSortCategory } from './features/sorting/sortingSlice';

// sorting buttons
// filter buttons
// light/dark theme toggle
// dropdown menu of matches on search input

const pageSize = 10;

function App() {
  const [paginatedGames, setPaginatedGames] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [currentData, setCurrentData] = useState(null);
  const pagination = useSelector(state => state.pagination);
  const gamesList = useSelector(state => state.games.gamesList);
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
      setCurrentData(games);
      dispatch(changeSortCategory({ sortBy: 'Rating' }));
      dispatch(changeOrder({ descendingOrder: true }));
      dispatch(sortByDefault({ gamesList: games }));
    }
  }, [games]);

  useEffect(() => {
    if (searchResult) {
      const nestedSearchResults = searchResult.map(obj => obj.game);
      setCurrentData(nestedSearchResults);
    }
  }, [searchResult]);

  useEffect(() => {
    if (currentData) {
      dispatch(sortByDefault({ gamesList: currentData}));
      paginateGames(currentData);
    }
  }, [currentData, pagination.currentPage]);

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

  function handleSearchInputChange(e) {
    setSearchInput(e.target.value);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
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
      <SortingBtns />
      <div className="grid grid-cols-2 gap-7">
        {paginatedGames.map((game) => {
          return (
            <div className="flex" key={game.id}>
              <img src={game.cover?.url} alt={game.name} />
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
                <p>{game.release_dates[0].y}</p>
              </div>
            </div>
          );
        })}
      </div>
      <Pagination pages={Math.ceil(currentData?.length / pageSize)} />
    </>)
  } else if (gamesError || searchError) {
    const errorData = gamesError ? gamesErrorData : searchErrorData;
    return <Error error={errorData.message} />;
  }

  return (
    <div className="App flex flex-col items-center bg-slate-100">
      <div className="w-8/12 bg-slate-200 p-2 min-h-screen">
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