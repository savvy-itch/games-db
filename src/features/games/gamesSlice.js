import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // store fetched data here
  fetchedGamesList: [],
  // make a copy to filter/sort
  gamesList: []
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
        sortedGames = [...state.gamesList].sort((a,b) => b.release_dates[0].y - a.release_dates[0].y);
      }
      if (!descendingOrder) {
        sortedGames.reverse();
      }
      return { ...state, gamesList: sortedGames };
    },
    filterGames(state, action) {
      const { filterCategory, filter } = action.payload;
      let filteredGames;
      if (filterCategory === 'platforms') {
        filteredGames = [...state.fetchedGamesList].filter(game => game.platforms.some(g => g.name === filter));
      } else if (filterCategory === 'release_dates') {
        filteredGames = [...state.fetchedGamesList].filter(game => game.release_dates.some(g => g.y === filter));
      } else if (filterCategory === 'genres') {
        filteredGames = [...state.fetchedGamesList].filter(game => game.genres.some(g => g.name === filter));
      } else if (filterCategory === 'themes') {
        filteredGames = [...state.fetchedGamesList].filter(game => game.themes.some(g => g.name === filter));
      } else if (filterCategory === 'game_modes') {
        filteredGames = [...state.fetchedGamesList].filter(game => game.game_modes.some(g => g.name === filter));
      } else if (filterCategory === 'player_perspectives') {
        filteredGames = [...state.fetchedGamesList].filter(game => game.player_perspectives.some(g => g.name === filter));
      }

      return {...state, gamesList: filteredGames};
    },
    unfilterGames(state, action) {
      const { filterCategory, filter } = action.payload;
      let filteredGames;
      // code...
      return {...state, gamesList: filteredGames};
    }
  }
})

export const { setFetchedGames, setGames, sortByDefault, sortByCategory, filterGames } = gamesSlice.actions;
export default gamesSlice.reducer;