import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsData, getOrderNumber } from '../../utils/IngredientsAPI';

const initialState = {
  products: [],
  ids: [],
  currentMainProducts: [],
  currentBun: {},
  currentProductsHasChanged: false,
  currentProduct: {},
  orderNumber: null,
  totalPrice: 0,
};

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getIngredientsData();
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getOrderNum = createAsyncThunk(
  'products/getOrderNum',
  async (productsIds, { rejectWithValue }) => {
    try {
      const response = await getOrderNumber(productsIds);
      const orderNumber = await response.order.number;
      return orderNumber;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const isEmpty = (obj) => {
  for (let key in obj) {
    return false;
  }
  return true;
};

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
    },
    // getCurrentMainProducts(state, action) {
    //   const stateHasChanged = state.currentMainProducts.length !== action.payload.length;
    //   if (stateHasChanged) {
    //     state.currentMainProducts = action.payload;
    //     const total = action.payload.reduce((acc, item) => {
    //       return acc + item.price;
    //     }, 0);
    //     state.totalPrice = state.totalPrice + total;
    //   }
    // },
    getCurrentBun(state, action) {
      const empty = isEmpty(state.currentBun);
      if (empty || state.currentBun._id !== action.payload._id) {
        state.currentBun = action.payload;
        if (action.payload) {
          const total = action.payload.price * 2;
          state.totalPrice = state.totalPrice + total;
        }
      }
    },
    addCurrentProduct(state, action) {
      const product = state.products.find((item) => item._id === action.payload.id);
      if (action.payload.type === 'bun' && product._id !== state.currentBun._id) {
        state.totalPrice = state.totalPrice - state.currentBun.price * 2 + product.price * 2;
        state.currentBun = product;
      } else if (action.payload.type !== 'bun') {
        state.totalPrice = state.totalPrice + product.price;
        state.currentMainProducts.push(product);
      }
    },
  },
  extraReducers: {
    [getProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [getProducts.rejected]: () => {},
    [getOrderNum.fulfilled]: (state, action) => {
      state.orderNumber = action.payload;
    },
    [getOrderNum.rejected]: () => {},
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice;
