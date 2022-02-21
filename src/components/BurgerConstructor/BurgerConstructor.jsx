import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burgerConstructor.module.css';
import ConstructorList from '../ConstructorList/ConstructorList';
import OrderBurger from '../OrderBurger/OrderBurger';

const initialPrice = { mainPrice: 0, bunsPrice: 0 };

const priceReducer = (state, action) => {
  if (action.type === 'sumMainPrice') {
    return { ...state, mainPrice: action.val };
  }
  if (action.type === 'sumBunsPrice') {
    return { ...state, bunsPrice: action.val };
  } else {
    throw new Error(`Wrong type of action: ${action.type}`);
  }
};

const BurgerConstructor = ({ handleOpenOrderDetailsPopup }) => {
  const [priceState, dispatchPrice] = useReducer(priceReducer, initialPrice);

  return (
    <section className={`${burgerConstructorStyles.container} mt-15`}>
      <ConstructorList dispatchPrice={dispatchPrice} />
      <OrderBurger
        handleOpenOrderDetailsPopup={handleOpenOrderDetailsPopup}
        priceState={priceState}
      />
    </section>
  );
};

BurgerConstructor.propTypes = {
  handleOpenOrderDetailsPopup: PropTypes.func.isRequired,
};

export default BurgerConstructor;
