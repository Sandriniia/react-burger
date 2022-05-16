import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './slices/productsSlice';
import popupSlice from './slices/popupSlice';
import userInfoSlice from './slices/userInfoSlice';
import webSocketSlice from './slices/webSocketSlice';
import socketMiddleware from './socketMiddleware';
import { socketActions } from './slices/webSocketSlice';

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    popup: popupSlice.reducer,
    user: userInfoSlice.reducer,
    socket: webSocketSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(socketActions)),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
