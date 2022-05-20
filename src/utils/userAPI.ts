import { checkResponse } from '../utils/functions';

const register = async (
  url: string,
  method: 'POST',
  headers: { [name: string]: string },
  body: BodyInit,
) => {
  const response = await fetch(url, {
    method,
    headers,
    body,
  });
  return checkResponse(response);
};

const login = async (
  url: string,
  method: 'POST',
  headers: { [name: string]: string },
  body: BodyInit,
) => {
  const response = await fetch(url, {
    method,
    headers,
    body,
  });
  return checkResponse(response);
};

const recoverPassword = async (
  url: string,
  method: 'POST',
  headers: { [name: string]: string },
  body: BodyInit,
) => {
  const response = await fetch(url, {
    method,
    headers,
    body,
  });
  return checkResponse(response);
};

const resetPassword = async (
  url: string,
  method: 'POST',
  headers: { [name: string]: string },
  body: BodyInit,
) => {
  const response = await fetch(url, {
    method,
    headers,
    body,
  });
  return checkResponse(response);
};

const getUserData = async (
  url: string,
  method: 'GET',
  headers: { [name: string]: string } | undefined,
) => {
  const response = await fetch(url, {
    method,
    headers,
  });
  return checkResponse(response);
};

const changeUserData = async (
  url: string,
  method: 'PATCH',
  headers: { [name: string]: string } | undefined,
  body: BodyInit,
) => {
  const response = await fetch(url, {
    method,
    headers,
    body,
  });
  return checkResponse(response);
};

const refreshToken = async (
  url: string,
  method: 'POST',
  headers: { [name: string]: string },
  body: BodyInit,
) => {
  const response = await fetch(url, {
    method,
    headers,
    body,
  });
  return checkResponse(response);
};

const logout = async (
  url: string,
  method: 'POST',
  headers: { [name: string]: string },
  body: BodyInit,
) => {
  const response = await fetch(url, {
    method,
    headers,
    body,
  });
  return checkResponse(response);
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
