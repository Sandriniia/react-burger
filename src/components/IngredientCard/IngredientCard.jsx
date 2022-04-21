import React from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ingredientCardStyles from './ingredientCard.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../utils/types';
import { popupActions } from '../../services/slices/popupSlice';
import { productsActions } from '../../services/slices/productsSlice';

const IngredientCard = ({ image, alt, price, name, product, id, count }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: { id, type: product.type },
  });

  const showIngredientsPopup = () => {
    dispatch(productsActions.getCurrentProduct(product));
    dispatch(popupActions.openIngredientsDetailsPopup());
  };

  return (
    <Link to={{ pathname: `/ingredients/${id}`, state: {modal: location} }}>
    <div
      className={ingredientCardStyles.card_container}
      onClick={showIngredientsPopup}
      ref={dragRef}
    >
      <Counter count={count} size='default' />
      <img src={image} alt={alt} className='mb-1' />
      <div className={`${ingredientCardStyles.price_box} mb-1`}>
        <p className='mr-2 text text_type_digits-default'>{price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <p className='mb-6 text text_type_main-default'>{name}</p>
      </div>
      </Link>
  );
};

IngredientCard.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  product: ingredientPropType.isRequired,
};

export default IngredientCard;
