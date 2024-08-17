
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { opportunitiesApi } from './service/apiSlice';

export const store = configureStore({
  reducer: {
    [opportunitiesApi.reducerPath]: opportunitiesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(opportunitiesApi.middleware),
});

setupListeners(store.dispatch);