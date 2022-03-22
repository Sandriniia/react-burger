import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { getIngredientsData, getOrderNumber } from '../../utils/IngredientsAPI';

const initialState = {
  products: [],
  ids: [],
  currentMainProducts: [],
  currentBun: [],
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

const subtractCount = (products, productId, countNum) => {
  products.map((i) => {
    if (i._id === productId) {
      i.count -= countNum;
    }
    return { ...i };
  });
};

const addCount = (products, productId, countNum) => {
  const id = nanoid();
  products.map((i) => {
    if (i._id === productId) {
      i.uid = id;
      i.count += countNum;
    }
    return { ...i };
  });
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getIds(state, { payload }) {
      const isIdIncluded = state.ids.includes(payload);
      !isIdIncluded && state.ids.push(payload);
    },
    getCurrentProduct(state, { payload }) {
      state.currentProduct = payload;
    },
    addProduct(state, { payload }) {
      const product = state.products.find((item) => item._id === payload.id);

      if (payload.type === 'bun') {
        if (state.currentBun.length === 0) {
          state.currentBun.push(product);
          state.totalPrice = state.totalPrice + product.price * 2;
          addCount(state.products, product._id, 2);
        } else {
          const bun = state.currentBun.find((item) => item);
          const isSame = bun._id === product._id;
          if (!isSame) {
            state.totalPrice = state.totalPrice - bun.price * 2 + product.price * 2;
            state.currentBun.splice(0, 1, product);
            subtractCount(state.products, bun._id, 2);
            addCount(state.products, product._id, 2);
          }
        }
      }
      if (payload.type !== 'bun') {
        state.totalPrice = state.totalPrice + product.price;
        state.currentMainProducts.push(product);
        addCount(state.products, product._id, 1);
      }
    },
    deleteProduct(state, { payload }) {
      let ids = [];
      state.currentMainProducts = state.currentMainProducts.filter((i, index) => {
        if (i._id === payload.item._id) {
          ids.push(i._id);
        }
        return index !== payload.index;
      });
      if (ids.length === 1) {
        state.ids = state.ids.filter((i) => {
          return i !== payload.item._id;
        });
      }
      state.totalPrice = state.totalPrice - payload.item.price;
      subtractCount(state.products, payload.item._id, 1);
    },
    moveConstructorIngredient(state, { payload }) {
      state.currentMainProducts[payload.dragIndex] = state.currentMainProducts.splice(
        payload.hoverIndex,
        1,
        state.currentMainProducts[payload.dragIndex],
      )[0];
    },
    cleanupIngredientsList(state) {
      state.currentMainProducts = [];
      state.currentBun = [];
      state.totalPrice = 0;
      state.ids = [];
      state.orderNumber = null;
      state.products.map((i) => {
        i.count -= i.count;
        return { ...i };
      });
    },
  },
  extraReducers: {
    [getProducts.fulfilled]: (state, { payload }) => {
      state.products = payload;
    },
    [getProducts.rejected]: () => {},
    [getOrderNum.fulfilled]: (state, { payload }) => {
      state.orderNumber = payload;
    },
    [getOrderNum.rejected]: () => {},
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice;
