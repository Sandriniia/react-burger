import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsData } from '../../utils/IngredientsAPI';

const initialState = { products: [], ids: [] };

export const getProducts = createAsyncThunk('allProducts/getProducts', async () => {
  const response = await getIngredientsData();
  const data = await response.data;
  return data;
});

const allProductsSlice = createSlice({
  name: 'allProducts',
  initialState,
  reducers: {
    getIds(state, action) {
      const isIdIncluded = state.ids.includes(action.payload);
      !isIdIncluded && state.ids.push(action.payload);
    },
  },
  extraReducers: {
    [getProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [getProducts.rejected]: () => {},
  },
});

export const allProductsActions = allProductsSlice.actions;

export default allProductsSlice;
