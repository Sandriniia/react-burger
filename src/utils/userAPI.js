const baseUrl = ' https://norma.nomoreparties.space/api/';

const getResponseData = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Ошибка ${res.status}`));
};

const register = (email, password, name) => {
  return fetch(`${baseUrl}auth/register`, {
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
  return fetch(`${baseUrl}auth/login`, {
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
  return fetch(`${baseUrl}password-reset`, {
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
  return fetch(`${baseUrl}password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: password,
      token: key
    }),
  }).then(getResponseData);
}

export { register, login, recoverPassword, resetPassword };
