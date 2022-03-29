import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register, login, recoverPassword } from '../../utils/userAPI';

const initialState = {
  email: '',
  password: '',
  name: '',
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const response = await register(email, password, name);
      const data = await response.user;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await login(email, password);
      const data = await response.user;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const recoverUserPassword = createAsyncThunk(
  'user/recoverUserPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await recoverPassword(email);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const userInfoSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [registerUser.fulfilled]: (state, { payload }) => {
      state.name = payload.name;
      state.email = payload.email;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.name = payload.name;
      state.email = payload.email;
    },
  },
});

export default userInfoSlice;
export const userActions = userInfoSlice.actions;
