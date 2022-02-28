import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsData, getOrderNumber } from '../../utils/IngredientsAPI';

const initialState = {
  products: [],
  ids: [],
  currentProduct: {},
  orderNumber: null,
};

export const getProducts = createAsyncThunk('products/getProducts', async (_,{rejectWithValue}) => {
  try {
    const response = await getIngredientsData();
    const data = await response.data;
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getOrderNum = createAsyncThunk('products/getOrderNum', async (productsIds,{rejectWithValue}) => {
  try {
    const response = await getOrderNumber(productsIds);
    const orderNumber = await response.order.number;
    return orderNumber;

  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getIds(state, action) {
      const isIdIncluded = state.ids.includes(action.payload);
      !isIdIncluded && state.ids.push(action.payload);
    },
    getCurrentProduct(state, action) {
      state.currentProduct = action.payload;
    }
  },
  extraReducers: {
    [getProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [getProducts.rejected]: () => { },
    [getOrderNum.fulfilled]: (state, action) => {
      state.orderNumber = action.payload;
    },
    [getOrderNum.rejected]: () => { },
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice;
