import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import gamesReducer from '../features/games/gamesSlice';
import paginationReducer from '../features/pagination/paginationSlice';
import sortingReducer from '../features/sorting/sortingSlice';
import { apiSlice } from '../features/api/apiSlice';
import filterSlice from '../features/filters/filterSlice';

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    pagination: paginationReducer,
    sorting: sortingReducer,
    filters: filterSlice,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});