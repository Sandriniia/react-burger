import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burgerConstructor.module.css';
import ConstructorList from '../ConstructorList/ConstructorList';
import OrderBurger from '../OrderBurger/OrderBurger';

const initialPrice = { mainPrice: 0, bunsPrice: 0, mainId: [], bunId: [] };

const productsReducer = (state, action) => {
  if (action.type === 'sumMainPrice') {
    return { ...state, mainPrice: action.val };
  }
  if (action.type === 'sumBunsPrice') {
    return { ...state, bunsPrice: action.val };
  }
  if (action.type === 'addMainId') {
    return { ...state, mainId: [...action.val] };
  }
  if (action.type === 'addBunId') {
    return { ...state, bunId: [...action.val] };
  } else {
    throw new Error(`Wrong type of action: ${action.type}`);
  }
};

const BurgerConstructor = ({ handleOpenOrderDetailsPopup }) => {
  const [priceState, dispatchProducts] = useReducer(productsReducer, initialPrice);

  console.log(priceState);

  return (
    <section className={`${burgerConstructorStyles.container} mt-15`}>
      <ConstructorList dispatchProducts={dispatchProducts} />
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
