import React, { useEffect, useState } from 'react';
import { useGetGamesQuery } from '../features/api/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';
import '../index.css';

import Loading from '../components/Loading';
import { setFetchedGames, setGames } from '../features/games/gamesSlice';
import Pagination from '../components/Pagination'
import { changeOrder, changeSortCategory } from '../features/sorting/sortingSlice';
import FilterSection from '../features/filters/FilterSection';
import SortingBtns from '../components/SortingBtns';
import Error from '../components/Error';
import GameCard from '../features/games/GameCard';
import { useLocation } from 'react-router-dom';

// single game page
// dropdown menu of matches on search input
// add loaders between data fetching
// remove filterCategory from an array when dispatching removeFilter if it ends up not needed
// toggle isSeatch back to false when clicking on the home page

const pageSize = 10;

function Home() {
  const [paginatedGames, setPaginatedGames] = useState([]);
  const location = useLocation();
  // needed to determine when filtering whether new data should be fetched or not
  const pagination = useSelector(state => state.pagination);
  const gamesState = useSelector(state => state.games);
  const dispatch = useDispatch();

  const {
    data: games,
    refetch: refetchGames,
    isLoading: gamesLoading,
    isSuccess: gamesSuccess,
    isError: gamesError,
  } = useGetGamesQuery();

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
    if (location.pathname === "/") {
      console.log('refetch')
    }
  }, [location.pathname])

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

  let content;

  if (gamesLoading) {
    content = <Loading />;
  } else if (paginatedGames.length === 0) {
    content = (
      <div className="flex min-h-[50vh] justify-center items-center">
        <h2 className="text-2xl dark:text-white">No matches were found</h2>
      </div>)
  } else if (gamesSuccess) {
    content = (
    <>
      <FilterSection />
      <SortingBtns />
      <div className="grid md:grid-cols-2 grid-cols-1 gap-7">
        {paginatedGames.map(game => {
          return <GameCard key={game.id} game={game} />
        })}
      </div>
      <Pagination pages={Math.ceil(gamesState.gamesList?.length / pageSize)} />
    </>)
  } else if (gamesError) {
    return <Error error={gamesError.message} />;
  }

  return (
    <div className="App flex flex-col items-center box-border bg-slate-100 dark:bg-slate-800 transition-colors">
      <div className="md:w-9/12 bg-slate-200 dark:bg-slate-900 p-3 rounded mb-9"> 
        {/* min-h-screen */}
        {content}
      </div>
    </div>
  );
}

export default Home;