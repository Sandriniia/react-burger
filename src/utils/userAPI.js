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

export { register };
