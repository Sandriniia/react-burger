import { baseUrl } from './constants';
import { getResponseData } from './functions';

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
