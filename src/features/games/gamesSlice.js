import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gamesList: [],
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
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
    }
  }
})

export const { setGames, sortByDefault, sortByCategory } = gamesSlice.actions;
export default gamesSlice.reducer;