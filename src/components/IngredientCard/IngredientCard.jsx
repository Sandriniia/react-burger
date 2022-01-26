import React from 'react';
import ingredientCardStyles from './ingredientCard.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientCard = ({ image, alt, price, name }) => {
  return (
    <div>
      <Counter count={1} size='default' />
      <img src={image} alt={alt} />
      <div>
        <p>{price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <p>{name}</p>
    </div>
  );
};

export default IngredientCard;
