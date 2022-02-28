import { configureStore } from "@reduxjs/toolkit";
import allProductsSlice from "./slices/allProductsSlice";

const store = configureStore({
  reducer: {
    allProducts: allProductsSlice.reducer,
  }
}) //reducer: {counter: counterSlice.reducer, auth: authSlice.reducer  }

export default store;