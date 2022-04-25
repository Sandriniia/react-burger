import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './slices/productsSlice';
import popupSlice from './slices/popupSlice';
import userInfoSlice from './slices/userInfoSlice';

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    popup: popupSlice.reducer,
    user: userInfoSlice.reducer,
  },
});

export default store;
