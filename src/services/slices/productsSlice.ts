import { createSlice, createAsyncThunk, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsData, getOrderNumber } from '../../utils/IngredientsAPI';
import { TIngredient } from '../types/types';
import { baseUrl } from '../../utils/constants';
import { getCookie } from '../../utils/cookies';

type TInitialState = {
  products: Array<TIngredient>;
  ids: Array<string>;
  currentMainProducts: Array<TIngredient>;
  currentBun: Array<TIngredient>;
  currentProduct: TIngredient | {};
  orderNumber: number | null;
  totalPrice: number;
  loading: boolean;
};

const initialState: TInitialState = {
  products: [],
  ids: [],
  currentMainProducts: [],
  currentBun: [],
  currentProduct: {},
  orderNumber: null,
  totalPrice: 0,
  loading: false,
};

export const getProducts = createAsyncThunk<Array<TIngredient>, undefined, { rejectValue: string }>(
  'products/getProducts',
  async (_, { rejectWithValue }) => {
    try {
      return getIngredientsData(`${baseUrl}/ingredients`);
    } catch (err) {
      return rejectWithValue('Произошла ошибка');
    }
  },
);

const token = getCookie('token');

export const getOrderNum = createAsyncThunk<number, Array<string>, { rejectValue: string }>(
  'products/getOrderNum',
  async (productsIds, { rejectWithValue }) => {
    try {
      return getOrderNumber(
        `${baseUrl}/orders`,
        'POST',
        { 'Content-Type': 'application/json', Authorization: token },
        JSON.stringify({
          ingredients: productsIds,
        }),
      );
    } catch (err) {
      return rejectWithValue('Произошла ошибка');
    }
  },
);

const subtractCount = (products: Array<TIngredient>, productId: string, countNum: number): void => {
  products.map((i) => {
    if (i._id === productId) {
      i.count -= countNum;
    }
    return { ...i };
  });
};

const addCount = (products: Array<TIngredient>, productId: string, countNum: number): void => {
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
      state.ids = payload;
    },
    getCurrentProduct(state, { payload }) {
      state.currentProduct = payload;
    },
    addProduct(state, { payload }: PayloadAction<TIngredient>) {
      const product = state.products.find((item) => item._id === payload.id);

      if (product && payload.type === 'bun') {
        if (state.currentBun.length === 0) {
          state.currentBun.push(product);
          state.totalPrice = state.totalPrice + product.price * 2;
          addCount(state.products, product._id, 2);
        } else {
          const bun = state.currentBun.find((item) => item);
          const isSame = bun && bun._id === product._id;
          if (bun && !isSame) {
            state.totalPrice = state.totalPrice - bun.price * 2 + product.price * 2;
            state.currentBun.splice(0, 1, product);
            subtractCount(state.products, bun._id, 2);
            addCount(state.products, product._id, 2);
          }
        }
      }
      if (product && payload.type !== 'bun') {
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
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = payload;
      })
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getOrderNum.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderNum.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orderNumber = payload;
      })
      .addCase(getOrderNum.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice;