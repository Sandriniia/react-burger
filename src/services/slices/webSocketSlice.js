import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  connected: false,
  data: {},
};

const webSocketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    start(state, { payload }) {},
    success(state, { payload }) {},
    error(state, { payload }) {},
    closed(state, { payload }) {},
    saveData(state, { payload }) {
      state.data = payload;
    },
  },
});

export const { start, success, error, closed, saveData } = webSocketSlice.actions;
export const socketActions = webSocketSlice.actions;
export default webSocketSlice;
