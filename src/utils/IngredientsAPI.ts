import { TIngredient } from '../services/types/types';
import { checkResponse } from './functions';

const getIngredientsData = async (url: string): Promise<Array<TIngredient>> => {
  const response = await fetch(url);
  const data = await checkResponse(response);

  const modifiedData: Array<TIngredient> =
    data.data &&
    (await data.data.map((i: TIngredient) => {
      return { ...i, count: 0 };
    }));
  return modifiedData;
};

const getOrderNumber = async (
  url: string,
  method: 'POST',
  headers: { [name: string]: any } | undefined,
  body: BodyInit,
) => {
  const response = await fetch(url, {
    method: method,
    headers: headers,
    body: body,
  });
  const data = await checkResponse(response);
  const orderNumber: number = await data.order.number;
  return orderNumber;
};

export { getIngredientsData, getOrderNumber };
