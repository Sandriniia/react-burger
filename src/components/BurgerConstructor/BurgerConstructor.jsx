import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burgerConstructor.module.css';
import ConstructorList from '../ConstructorList/ConstructorList';
import OrderBurger from '../OrderBurger/OrderBurger';

const initialPrice = { mainPrice: 0, bunsPrice: 0 };

const priceReducer = (state, action) => {
  switch (action.type) {
    case 'sumMainPrice':
      return { ...state, mainPrice: action.val };
    case 'sumBunsPrice':
      return { ...state, bunsPrice: action.val };
    default:
      return state;
  }
};

const BurgerConstructor = ({ handleOpenOrderDetailsPopupAndGetOrderNumber }) => {
  const [priceState, dispatchPrice] = useReducer(priceReducer, initialPrice);

  return (
    <section className={`${burgerConstructorStyles.container} mt-15`}>
      <ConstructorList dispatchPrice={dispatchPrice} />
      <OrderBurger
        handleOpenOrderDetailsPopupAndGetOrderNumber={handleOpenOrderDetailsPopupAndGetOrderNumber}
        priceState={priceState}
      />
    </section>
  );
};

BurgerConstructor.propTypes = {
  handleOpenOrderDetailsPopupAndGetOrderNumber: PropTypes.func.isRequired,
};

export default BurgerConstructor;
