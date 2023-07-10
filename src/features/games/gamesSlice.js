import { createSlice } from "@reduxjs/toolkit";
import { unixToDate } from "../../helpers";

const initialState = {
  // store fetched data here
  fetchedGamesList: [],
  // make a copy to filter/sort
  gamesList: [],
  // isSearch: false,
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
    sortByDefault(state) {
      // sort by descending order
      let sortedGames = [...state.gamesList].sort((a,b) => b.total_rating - a.total_rating);
      return {...state, gamesList: sortedGames};
    },
    sortByCategory(state, action) {
      let sortedGames;
      const {sortBy, descendingOrder} = action.payload;
      if (sortBy === 'Rating') {
        sortedGames = [...state.gamesList].sort((a,b) => b.total_rating - a.total_rating);
      } else if (sortBy === 'Title') {
        sortedGames = [...state.gamesList].sort((a,b) => a.name.localeCompare(b.name));
      } else if (sortBy === 'Release Date') {
        sortedGames = [...state.gamesList].sort((a,b) => b.first_release_date - a.first_release_date);
      }
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
        if (filter[0] === 'release_dates') {
          filteredGames = filteredGames.filter(game => unixToDate(game.first_release_date) === filter[1]);
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
      })
      return {...state, gamesList: filteredGames};
    },
  }
})

export const { setFetchedGames, setGames, sortByDefault, sortByCategory, filterGames } = gamesSlice.actions;
export default gamesSlice.reducer;