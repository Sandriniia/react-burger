import { formatRelative } from 'date-fns';
import { ru } from 'date-fns/locale';
import { TIngredient } from '../services/types/types';

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

const filterProductsByType = (products: Array<TIngredient>, type: string): Array<TIngredient> => {
  const ingredients = products.filter((item) => {
    return item.type === type;
  });
  return ingredients;
};

const getDate = (date:string) => {
  if (date)
    return (
      formatRelative(new Date(date), new Date(), { locale: ru }).split(' в ').join(', ') +
      ' i-GMT+3'
    );
};

const checkResponse = (response: Response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(new Error(`Ошибка ${response.status}`));
}


export { getRefreshToken, getToken, filterProductsByType, getDate, checkResponse };
