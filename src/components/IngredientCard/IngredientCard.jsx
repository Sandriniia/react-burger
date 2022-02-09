import React from 'react';
import PropTypes from 'prop-types';
import ingredientCardStyles from './ingredientCard.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../utils/types';

const IngredientCard = ({ image, alt, price, name, product, handleOpenIngredientDetailsPopup }) => {
  const handleOpenAndShowProduct = () => {
    handleOpenIngredientDetailsPopup(product);
  };

  return (
    <div className={ingredientCardStyles.card_container} onClick={handleOpenAndShowProduct}>
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

IngredientCard.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  product: ingredientPropType.isRequired,
  handleOpenIngredientDetailsPopup: PropTypes.func.isRequired,
};

export default IngredientCard;
