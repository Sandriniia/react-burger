import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../types/types';

type TOrdersData = {
  "success": boolean,
  "orders": Array<TOrder>,
  "total": number,
  "totalToday": number,
}

type TInitialState = {
  connected: boolean,
  loading: boolean,
  error: boolean,
  data?: TOrdersData | null
}

const initialState: TInitialState = {
  connected: false,
  loading: false,
  error: false,
  data: null,
};

const webSocketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    start(state, { payload }) {
      state.connected = false;
      state.error = false;
      state.loading = true;
    },
    success(state) {
      state.connected = true;
      state.error = false;
      state.loading = false;
    },
    error(state) {
      state.connected = false;
      state.error = true;
      state.loading = false;
    },
    closed(state) {
      state.connected = false;
      state.error = false;
      state.loading = false;
    },
    saveData(state, { payload }) {
      state.data = payload;
    },
  },
});

export const { start, success, error, closed, saveData } = webSocketSlice.actions;
export const socketActions = webSocketSlice.actions;
export default webSocketSlice;
