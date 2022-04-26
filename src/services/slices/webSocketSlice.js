import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  connected: false,
}

const webSocketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    start(state, { payload }) { },
    success(state, { payload }) { },
    error(state, { payload }) { },
    closed(state, { payload }) { },
  }
})

export const { start, success, error, closed } = webSocketSlice.actions;
export const socketActions = webSocketSlice.actions;
export default webSocketSlice;