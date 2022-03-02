import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './slices/productsSlice';
import popupSlice from './slices/popupSlice';

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    popup: popupSlice.reducer,
  },
});

export default store;
