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
import { baseUrl } from '../../utils/constants';
import { getRefreshToken } from '../../utils/functions';

import { setCookie, deleteCookie } from '../../utils/cookies';

type TInitialState = {
  email: string;
  name: string;
  isLogged: string | null;
  error: string;
  message: string;
  isForgotPassReqSuccess: boolean;
  tokenError: boolean;
  token: string;
  loading: boolean;
};

const initialState: TInitialState = {
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

export const registerUser = createAsyncThunk<
  any,
  { email: string; password: string; name: string },
  { rejectValue: string }
>('user/registerUser', async ({ email, password, name }, { rejectWithValue }) => {
  try {
    return register(
      `${baseUrl}/auth/register`,
      'POST',
      { 'Content-Type': 'application/json' },
      JSON.stringify({
        email,
        password,
        name,
      }),
    );
  } catch (error) {
    return rejectWithValue('Произошла ошибка');
  }
});

export const loginUser = createAsyncThunk<
  any,
  { email: string; password: string },
  { rejectValue: string }
>('user/loginUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    const res = await login(
      `${baseUrl}/auth/login`,
      'POST',
      { 'Content-Type': 'application/json' },
      JSON.stringify({
        email,
        password,
      }),
    );
    const data = { res, password };
    return data;
  } catch (error) {
    return rejectWithValue('Произошла ошибка');
  }
});

export const recoverUserPassword = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>('user/recoverUserPassword', async (email, { rejectWithValue }) => {
  try {
    return recoverPassword(
      `${baseUrl}/password-reset`,
      'POST',
      { 'Content-Type': 'application/json' },
      JSON.stringify({
        email,
      }),
    );
  } catch (error) {
    return rejectWithValue('Произошла ошибка');
  }
});

export const resetUserPassword = createAsyncThunk<
  any,
  { password: string; key: string },
  { rejectValue: string }
>('user/resetUserPassword', async ({ password, key }, { rejectWithValue }) => {
  try {
    return resetPassword(
      `${baseUrl}/password-reset`,
      'POST',
      { 'Content-Type': 'application/json' },
      JSON.stringify({
        password,
        token: key,
      }),
    );
  } catch (error) {
    return rejectWithValue('Произошла ошибка');
  }
});

export const refreshUserToken = createAsyncThunk<any, undefined, { rejectValue: string }>(
  'user/refreshUserToken',
  async (_, { rejectWithValue }) => {
    try {
      return refreshToken(`${baseUrl}/auth/token`,
      'POST',
      { 'Content-Type': 'application/json' },
      JSON.stringify({
        token: getRefreshToken(),
      }),);
    } catch (error) {
      return rejectWithValue('Произошла ошибка');
    }
  },
);

export const getUserInfo = createAsyncThunk<any, string, { rejectValue: string }>(
  'user/getUserInfo',
  async (token, { rejectWithValue }) => {
    try {
      return getUserData(`${baseUrl}/auth/user`, 'GET', {
        'Content-Type': 'application/json',
        Authorization: token,
      });
    } catch (error) {
      return rejectWithValue('Произошла ошибка');
    }
  },
);

export const changeUserInfo = createAsyncThunk<
  any,
  { token?: string; name?: string; email?: string; password?: string },
  { rejectValue: string }
>('user/changeUserInfo', async ({ token, name, email, password }, { rejectWithValue }) => {
  try {
     return token && changeUserData(
      `${baseUrl}/password-reset`,
      'PATCH',
      { 'Content-Type': 'application/json', Authorization: token },
      JSON.stringify({
        name,
        email,
        password,
      }),
    );
  } catch (error) {
    return rejectWithValue('Произошла ошибка');
  }
});

export const logoutUser = createAsyncThunk<any, string, { rejectValue: string }>(
  'user/logoutUser',
  async (refToken, { rejectWithValue }) => {
    try {
      return logout(`${baseUrl}/auth/logout`,
      'POST',
      { 'Content-Type': 'application/json' },
      JSON.stringify({
        token: refToken,
      }),);
    } catch (error) {
      return rejectWithValue('Произошла ошибка');
    }
  },
);

const userInfoSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = '';
        state.message = 'Регистрация прошла успешно! Пожалуйста, войдите.';
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
        state.message = '';
        state.error = 'Во время регистрации произошла ошибка.';
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = '';
        setCookie('token', payload.res.accessToken);
        localStorage.setItem('refreshToken', payload.res.refreshToken);
        localStorage.setItem('isLogged', 'true');
        state.isLogged = localStorage.getItem('isLogged');
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.error = 'Произошла ошибка! Пожалуйста, проверьте данные и попробуйте войти снова.';
      })
      .addCase(recoverUserPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(recoverUserPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = '';
        state.isForgotPassReqSuccess = true;
      })
      .addCase(recoverUserPassword.rejected, (state) => {
        state.loading = false;
        state.error =
          'Произошла ошибка! Вы уверены что это зарегистрированный e-mail? Пожалуйста, попробуйте снова.';
      })
      .addCase(resetUserPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetUserPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = '';
        state.message = 'Восстановление пароля прошло успешно! Пожалуйста, войдите.';
      })
      .addCase(resetUserPassword.rejected, (state) => {
        state.loading = false;
        state.message = '';
        state.error =
          'Произошла ошибка! Пожалуйста, попробуйте снова. Введите новый пароль и код из письма.';
      })
      .addCase(changeUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeUserInfo.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changeUserInfo.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload === 'Ошибка 403') {
          state.tokenError = true;
        }
      })
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.name = payload.user.name;
        state.email = payload.user.email;
      })
      .addCase(getUserInfo.rejected, (state) => {
        state.loading = false;
      })
      .addCase(refreshUserToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshUserToken.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.tokenError = false;
        state.token = payload.accessToken;
        setCookie('token', payload.accessToken);
        localStorage.setItem('refreshToken', payload.refreshToken);
      })
      .addCase(refreshUserToken.rejected, (state) => {
        state.loading = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        localStorage.clear();
        deleteCookie('token');
        state.name = '';
        state.email = '';
        state.isLogged = localStorage.getItem('isLogged');
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default userInfoSlice;
export const userActions = userInfoSlice.actions;
