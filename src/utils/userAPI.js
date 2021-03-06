import { getRefreshToken, getResponseData } from './functions';
import { baseUrl } from './constants';

const register = (email, password, name) => {
  return fetch(`${baseUrl}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  }).then(getResponseData);
};

const login = (email, password) => {
  return fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then(getResponseData);
};

const recoverPassword = (email) => {
  return fetch(`${baseUrl}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
    }),
  }).then(getResponseData);
};

const resetPassword = (password, key) => {
  return fetch(`${baseUrl}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: password,
      token: key,
    }),
  }).then(getResponseData);
};

const getUserData = (token) => {
  return fetch(`${baseUrl}/auth/user`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  }).then(getResponseData);
};

const changeUserData = (token, name, email, password) => {
  return fetch(`${baseUrl}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  }).then(getResponseData);
};

const refreshToken = () => {
  return fetch(`${baseUrl}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: getRefreshToken(),
    }),
  }).then(getResponseData);
};

const logout = (refToken) => {
  return fetch(`${baseUrl}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: refToken,
    }),
  }).then(getResponseData);
};

export {
  register,
  login,
  recoverPassword,
  resetPassword,
  getUserData,
  changeUserData,
  refreshToken,
  logout,
};
