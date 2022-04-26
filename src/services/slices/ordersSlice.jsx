import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  totalNumberOfOrders: null,
  todayNumberOfOrders: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    saveData(state, { payload }) {
      state.orders = payload.orders;
      state.totalNumberOfOrders = payload.total;
      state.todayNumberOfOrders = payload.totalToday;
    },
  },
});

export const ordersActions = ordersSlice.actions;
export default ordersSlice;
