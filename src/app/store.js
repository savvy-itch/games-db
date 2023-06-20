import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import paginationReducer from '../features/pagination/paginationSlice';
import sortingReducer from '../features/sorting/sortingSlice';
import { apiSlice } from '../features/api/apiSlice';

export const store = configureStore({
  reducer: {
    pagination: paginationReducer,
    sorting: sortingReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});
