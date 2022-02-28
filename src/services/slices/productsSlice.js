import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsData } from '../../utils/IngredientsAPI';

const initialState = { products: [], ids: [] };

export const getProducts = createAsyncThunk('products/getProducts', async () => {
  const response = await getIngredientsData();
  const data = await response.data;
  return data;
});

const productsSlice = createSlice({
  name: 'products',
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

export const productsActions = productsSlice.actions;

export default productsSlice;
