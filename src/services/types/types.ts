import { Location } from 'history'

export type TIngredient = {
  readonly calories: number;
  readonly carbohydrates: number;
  readonly fat: number;
  readonly image: string;
  readonly name: string;
  readonly price: number;
  readonly proteins: number;
  readonly type: string;
  readonly _id: string;
  count: number;
  index?: number,
  id?: string,
  uid?: string;
};

export type Order = {
  image: string;
  alt: string;
  price: number;
  name: string;
  product: TIngredient;
  id: string;
  count: number;
};

export type TLocation = {
  background?: Location<TLocation>;
  from?: {pathname: string};
};

export type TOrder = {
  "ingredients": Array<string>,
  "_id": string,
  "status": string,
  "number": number,
  "createdAt": string,
  "updatedAt": string,
  "name": string,
}