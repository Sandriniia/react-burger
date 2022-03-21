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
    getIds(state, action) {
      const isIdIncluded = state.ids.includes(action.payload);
      !isIdIncluded && state.ids.push(action.payload);
    },
    getCurrentProduct(state, action) {
      state.currentProduct = action.payload;
    },
    addProduct(state, action) {
      const product = state.products.find((item) => item._id === action.payload.id);

      if (action.payload.type === 'bun') {
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
      if (action.payload.type !== 'bun') {
        state.totalPrice = state.totalPrice + product.price;
        state.currentMainProducts.push(product);
        addCount(state.products, product._id, 1);
      }
    },
    deleteProduct(state, action) {
      let price;
      state.currentMainProducts = state.currentMainProducts.filter((i, index) => {
        if (i._id === action.payload.id) {
          price = i.price;
        }
        return index !== action.payload.index;
      });
      state.totalPrice = state.totalPrice - price;
      state.products.map((i) => {
        if (i._id === action.payload.id) {
          return { ...i, count: i.count-- };
        }
        return { ...i };
      });
    },
    moveConstructorIngredient(state, action) {
      state.currentMainProducts[action.payload.dragIndex] = state.currentMainProducts.splice(
        action.payload.hoverIndex,
        1,
        state.currentMainProducts[action.payload.dragIndex],
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
