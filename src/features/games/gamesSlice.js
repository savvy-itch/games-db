import { createSlice } from "@reduxjs/toolkit";
import { yearToUnix } from "../../helpers";

const initialState = {
  // store fetched data here
  fetchedGamesList: [],
  // make a copy to filter/sort
  gamesList: [],
  isSearch: false
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setFetchedGames(state, action) {
      return {...state, fetchedGamesList: action.payload.fetchedGamesList}
    },
    setGames(state, action) {
      return {...state, gamesList: action.payload.gamesList}
    },
    setIsSearch(state, action) {
      return {...state, isSearch: action.payload.isSearch}
    },
    sortByDefault(state) {
      // sort in descending order
      let sortedGames = [...state.gamesList].sort((a,b) => b.total_rating - a.total_rating);
      return {...state, gamesList: sortedGames};
    },
    sortByCategory(state, action) {
      let sortedGames = [...state.gamesList];
      const {sortBy, descendingOrder} = action.payload;
      if (sortBy === 'Rating') {
        sortedGames = sortedGames.sort((a,b) => b.total_rating - a.total_rating);
      } else if (sortBy === 'Title') {
        sortedGames = sortedGames.sort((a,b) => a.name.localeCompare(b.name));
      } else if (sortBy === 'Release Date') {
        sortedGames = sortedGames.sort((a,b) => b.first_release_date - a.first_release_date);
      }
      // reverse order
      if (!descendingOrder) {
        sortedGames.reverse();
      }
      return { ...state, gamesList: sortedGames };
    },
    filterGames(state, action) {
      let filteredGames = [...state.fetchedGamesList];
      action.payload.filters.forEach(filter => {
        if (filter[0] === 'platforms') {
          filteredGames = filteredGames.filter(game => game.platforms.some(g => g.name === filter[1]));
        }
        if (filter[0] === 'first_release_date') {
          filteredGames = filteredGames.filter(game => game.first_release_date > yearToUnix(filter[1], 'start') && game.first_release_date < yearToUnix(filter[1], 'end'));
        }
        if (filter[0] === 'genres') {
          filteredGames = filteredGames.filter(game => game.genres.some(g => g.name === filter[1]));
        }
        if (filter[0] === 'themes') {
          filteredGames = filteredGames.filter(game => game.themes.some(g => g.name === filter[1]));
        }
        if (filter[0] === 'game_modes') {
          filteredGames = filteredGames.filter(game => game.game_modes.some(g => g.name === filter[1]));
        }
        if (filter[0] === 'player_perspectives') {
          filteredGames = filteredGames.filter(game => game.player_perspectives.some(g => g.name === filter[1]));
        }
      });
      if (action.payload.minRating !== '') {
        filteredGames = filteredGames.filter(game => game.total_rating > action.payload.minRating);
      }
      if (action.payload.maxRating !== '') {
        filteredGames = filteredGames.filter(game => game.total_rating < action.payload.maxRating);
      }
      return {...state, gamesList: filteredGames};
    },
  }
})

export const { setFetchedGames, setGames, setIsSearch, sortByDefault, sortByCategory, filterGames } = gamesSlice.actions;
export default gamesSlice.reducer;