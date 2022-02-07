import React from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burgerConstructor.module.css';
import ConstructorList from '../ConstructorList/ConstructorList';
import OrderBurger from '../OrderBurger/OrderBurger';

const BurgerConstructor = ({ handleOpenOrderDetailsPopup }) => {
  return (
    <section className={burgerConstructorStyles.container}>
      <ConstructorList />
      <OrderBurger handleOpenOrderDetailsPopup={handleOpenOrderDetailsPopup}/>
    </section>
  );
};

BurgerConstructor.propTypes = {
  savedIngredients: PropTypes.array,
};

export default BurgerConstructor;
