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

import { setCookie, deleteCookie } from '../../utils/cookies';

const initialState = {
  email: '',
  name: '',
  isLogged: localStorage.getItem('isLogged'),
  error: '',
  message: '',
  isForgotPassReqSuccess: false,
  tokenError: false,
  token: '',
  loading: false,
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

export const refreshUserToken = createAsyncThunk(
  'user/refreshUserToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await refreshToken();
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
    [registerUser.pending]: (state) => {
      state.loading = true;
    },
    [registerUser.fulfilled]: (state) => {
      state.loading = false;
      state.error = '';
      state.message = 'Регистрация прошла успешно! Пожалуйста, войдите.';
    },
    [registerUser.rejected]: (state) => {
      state.loading = false;
      state.message = '';
      state.error = 'Во время регистрации произошла ошибка.';
    },
    [loginUser.pending]: (state) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = '';
      setCookie('token', payload.response.accessToken);
      localStorage.setItem('refreshToken', payload.response.refreshToken);
      localStorage.setItem('isLogged', true);
      state.isLogged = localStorage.getItem('isLogged');
    },
    [loginUser.rejected]: (state) => {
      state.loading = false;
      state.error = 'Произошла ошибка! Пожалуйста, проверьте данные и попробуйте войти снова.';
    },
    [recoverUserPassword.pending]: (state) => {
      state.loading = true;
    },
    [recoverUserPassword.fulfilled]: (state) => {
      state.loading = false;
      state.error = '';
      state.isForgotPassReqSuccess = true;
    },
    [recoverUserPassword.rejected]: (state) => {
      state.loading = false;
      state.error =
        'Произошла ошибка! Вы уверены что это зарегистрированный e-mail? Пожалуйста, попробуйте снова.';
    },
    [resetUserPassword.pending]: (state) => {
      state.loading = true;
    },
    [resetUserPassword.fulfilled]: (state) => {
      state.loading = false;
      state.error = '';
      state.message = 'Восстановление пароля прошло успешно! Пожалуйста, войдите.';
    },
    [resetUserPassword.rejected]: (state) => {
      state.loading = false;
      state.message = '';
      state.error =
        'Произошла ошибка! Пожалуйста, попробуйте снова. Введите новый пароль и код из письма.';
    },
    [changeUserInfo.pending]: (state) => {
      state.loading = true;
    },
    [changeUserInfo.fulfilled]: (state) => {
      state.loading = false;
    },
    [changeUserInfo.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload === 'Ошибка 403') {
        state.tokenError = true;
      }
    },
    [getUserInfo.pending]: (state) => {
      state.loading = true;
    },
    [getUserInfo.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.name = payload.user.name;
      state.email = payload.user.email;
    },
    [getUserInfo.rejected]: (state) => {
      state.loading = false;
    },
    [refreshUserToken.pending]: (state) => {
      state.loading = true;
    },
    [refreshUserToken.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.tokenError = false;
      state.token = payload.accessToken;
      setCookie('token', payload.accessToken);
      localStorage.setItem('refreshToken', payload.refreshToken);
    },
    [refreshUserToken.rejected]: (state) => {
      state.loading = false;
    },
    [logoutUser.pending]: (state) => {
      state.loading = true;
    },
    [logoutUser.fulfilled]: (state) => {
      state.loading = false;
      localStorage.clear();
      deleteCookie('token');
      state.name = '';
      state.email = '';
      state.isLogged = localStorage.getItem('isLogged');
    },
    [logoutUser.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default userInfoSlice;
export const userActions = userInfoSlice.actions;
