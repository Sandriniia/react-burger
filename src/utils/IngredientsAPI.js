const baseUrl = 'https://norma.nomoreparties.space/api';

const getResponseData = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Ошибка ${res.status}`));
};

const getIngredientsData = () => {
  return fetch(`${baseUrl}/ingredients`).then(getResponseData);
};

const getOrderNumber = (arrayOfIngredientsId) => {
  return fetch(`${baseUrl}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ingredients: arrayOfIngredientsId,
    }),
  }).then(getResponseData);
};

export { getIngredientsData, getOrderNumber };
