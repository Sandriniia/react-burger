import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsData, getOrderNumber } from '../../utils/IngredientsAPI';

const initialState = {
  products: [],
  ids: [],
  currentMainProducts: [],
  currentBun: [],
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
      const modifiedData = await data.map((i) => {
        return { ...i, count: 0 };
      });
      return modifiedData;
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

    getCurrentBun(state, action) {
      if (state.currentBun.length === 0) {
        state.currentBun.push(action.payload);
        const total = action.payload.price * 2;
        state.totalPrice = state.totalPrice + total;
        const bun = state.currentBun.find((item) => item);
        state.products.map((i) => {
          if (i._id === bun._id) {
            return { ...i, count: (i.count += 2) };
          }
          return { ...i };
        });
      }
    },
    addProduct(state, action) {
      const product = state.products.find((item) => item._id === action.payload.id);

      if (action.payload.type === 'bun') {
        const sameBun = state.currentBun.filter((item) => {
          return item._id === product._id;
        });
        const bun = state.currentBun.find((item) => item);
        const currentBunPrice = bun.price;

        if (sameBun.length === 0) {
          state.totalPrice = state.totalPrice - currentBunPrice * 2 + product.price * 2;
          state.currentBun.splice(0, 1, product);
          state.products.map((i) => {
            if (i._id === bun._id) {
              return { ...i, count: (i.count -= 2) };
            } else if (i._id === product._id) {
              return { ...i, count: (i.count += 2) };
            }
            return { ...i };
          });
        }
      } else if (action.payload.type !== 'bun') {
        state.totalPrice = state.totalPrice + product.price;
        state.currentMainProducts.push(product);
        state.products.map((i) => {
          if (i._id === product._id) {
            return { ...i, count: i.count++ };
          }
          return { ...i };
        });
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
