import React from 'react';
import PropTypes from 'prop-types';
import ingredientCardStyles from './ingredientCard.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientCard = ({ image, alt, price, name, product, handleAddIngredient }) => {
  const handleAddProduct = () => {
    handleAddIngredient(product);
  };

  return (
    <div className={ingredientCardStyles.card_container} onClick={handleAddProduct}>
      <Counter count={1} size='default' />
      <img src={image} alt={alt} className={ingredientCardStyles.image} />
      <div className={ingredientCardStyles.price_box}>
        <p className={`${ingredientCardStyles.price} text text_type_digits-default`}>{price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <p className={ingredientCardStyles.name}>{name}</p>
    </div>
  );
};

const ingredient = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
});

IngredientCard.propTypes = {
  image: PropTypes.string,
  alt: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
  product: ingredient,
  handleAddIngredient: PropTypes.func,
};

export default IngredientCard;
