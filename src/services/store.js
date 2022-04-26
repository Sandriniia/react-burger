import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './slices/productsSlice';
import popupSlice from './slices/popupSlice';
import userInfoSlice from './slices/userInfoSlice';
import webSocketSlice from './slices/webSocketSlice';
import ordersSlice from './slices/ordersSlice';
import socketMiddleware from './socketMiddleware';
import { socketActions } from './slices/webSocketSlice';

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    popup: popupSlice.reducer,
    user: userInfoSlice.reducer,
    socket: webSocketSlice.reducer,
    orders: ordersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(socketActions)),
});

export default store;
