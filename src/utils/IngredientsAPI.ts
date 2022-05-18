import { TIngredient } from '../services/types/types';

const getIngredientsData = async (url: string): Promise<Array<TIngredient>> => {
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    const modifiedData: Array<TIngredient> =
      data.data &&
      (await data.data.map((i: TIngredient) => {
        return { ...i, count: 0 };
      }));
    return modifiedData;
  }
  return Promise.reject(new Error(`Ошибка ${response.status}`));
};

const getOrderNumber = async (
  url: string,
  method: 'POST',
  headers: {[name:string]: any} | undefined,
  body: BodyInit,
) => {
  const response = await fetch(url, {
    method: method,
    headers: headers,
    body: body,
  });
  if (response.ok) {
    const data = await response.json();
    const orderNumber: number = await data.order.number;
    return orderNumber;
  }
  return Promise.reject(new Error(`Ошибка ${response.status}`));
};

export { getIngredientsData, getOrderNumber };
