import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  register,
  login,
  recoverPassword,
  resetPassword,
  getUserData,
  changeUserData,
  refreshToken,
  logout,
} from '../../utils/userAPI';

const initialState = {
  email: '',
  name: '',
  password: '',
  accessToken: '',
  refreshToken: '',
  isLogged: false,
  error: '',
  message: '',
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const response = await register(email, password, name);
      return response;
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
      const data = { response, password };
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

export const resetUserPassword = createAsyncThunk(
  'user/resetUserPassword',
  async ({ password, key }, { rejectWithValue }) => {
    try {
      const response = await resetPassword(password, key);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async (token, { rejectWithValue }) => {
    try {
      const response = await getUserData(token);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const changeUserInfo = createAsyncThunk(
  'user/changeUserInfo',
  async ({ token, name, email, password }, { rejectWithValue }) => {
    try {
      const response = await changeUserData(token, name, email, password);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const refreshUserToken = createAsyncThunk(
  'user/refreshUserToken',
  async (refToken, { rejectWithValue }) => {
    try {
      const response = await refreshToken(refToken);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (refToken, { rejectWithValue }) => {
    try {
      const response = await logout(refToken);
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
    [registerUser.fulfilled]: (state) => {
      state.error = '';
      state.message = 'Регистрация прошла успешно! Пожалуйста, войдите.'
    },
    [registerUser.rejected]: (state) => {
      state.message = '';
      state.error = 'Во время регистрации произошла ошибка.';
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.error = '';
      state.accessToken = payload.response.accessToken;
      state.refreshToken = payload.response.refreshToken;
      state.isLogged = payload.response.success;
      state.password = payload.password;
    },
    [loginUser.rejected]: (state) => {
      state.error = 'Произошла ошибка! Пожалуйста, проверьте данные и попробуйте войти снова.';
    },
    [recoverUserPassword.fulfilled]: (state) => {
      state.error = '';
    },
    [recoverUserPassword.rejected]: (state) => {
      state.error = 'Произошла ошибка! Вы уверены что это зарегистрированный e-mail? Пожалуйста, попробуйте снова.';
    },
    [resetUserPassword.fulfilled]: (state) => {
      state.error = '';
      state.message = 'Восстановление пароля прошло успешно! Пожалуйста, войдите.';
    },
    [resetUserPassword.rejected]: (state) => {
      state.message = '';
      state.error = 'Произошла ошибка! Пожалуйста, попробуйте снова. Введите новый пароль и код из письма.';
    },
    [getUserInfo.fulfilled]: (state, { payload }) => {
      state.name = payload.user.name;
      state.email = payload.user.email;
    },
    [refreshUserToken.fulfilled]: (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    },
    [logoutUser.fulfilled]: (state) => {
      state.accessToken = '';
      state.refreshToken = '';
      state.isLogged = false;
    },
  },
});

export default userInfoSlice;
export const userActions = userInfoSlice.actions;

// testatonsa@riseup.net
