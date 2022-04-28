import { formatRelative } from 'date-fns';
import { ru } from 'date-fns/locale';

const getRefreshToken = () => {
  const refToken = localStorage.getItem('refreshToken');

  if (!refToken) {
    return;
  }
  return refToken;
};

const getToken = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return;
  }
  return token;
};

const filterProductsByType = (products, type) => {
  const ingredients = products.filter((item) => {
    return item.type === type;
  });
  return ingredients;
};

const getDate = (date) => {
  const formattedDate = formatRelative(new Date(date), new Date(), { local: ru });
  if (date) return formattedDate.split('в').join(', ') + 'i-GMT+3';
};

const getResponseData = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Ошибка ${res.status}`));
};

export { getRefreshToken, getToken, filterProductsByType, getDate, getResponseData };
