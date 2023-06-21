import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gamesList: [],
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    // setGames(state, action) ?
     
    sortByDefault(state, action) {
      // sort by descending order
      let sortedGames = [...action.payload.gamesList].sort((a,b) => b.total_rating - a.total_rating);
      return {...state, gamesList: sortedGames};
    },
    sortByCategory(state, action) {
      let sortedGames;
      const {sortBy, descendingOrder} = action.payload;
      if (sortBy === 'Rating') {
        if (descendingOrder) {
          sortedGames = [...state.gamesList].sort((a,b) => b.total_rating - a.total_rating);
        } else {
          sortedGames = [...state.gamesList].sort((a,b) => a.total_rating - b.total_rating);
        }
      } else if (sortBy === 'Title') {
        if (descendingOrder) {
          sortedGames = [...state.gamesList].sort((a,b) => b.name - a.name);
        } else {
          sortedGames = [...state.gamesList].sort((a,b) => a.name - b.name);
        }
      } else if (sortBy === 'Release Date') {
        if (descendingOrder) {
          sortedGames = [...state.gamesList].sort((a,b) => b.release_dates.y - a.release_dates.y);
        } else {
          sortedGames = [...state.gamesList].sort((a,b) => a.release_dates.y - b.release_dates.y);
        }
      }
      return { ...state, gamesList: sortedGames };
    }
  }
})

export const { sortByDefault, sortByCategory } = gamesSlice.actions;
export default gamesSlice.reducer;