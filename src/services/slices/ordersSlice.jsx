import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  allOrders: [],
  userOrders: [],
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {}
})

export const ordersActions = ordersSlice.actions;
export default ordersSlice;