import React from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burgerConstructor.module.css';
import ConstructorList from '../ConstructorList/ConstructorList';
import OrderBurger from '../OrderBurger/OrderBurger';

const BurgerConstructor = ({ savedIngredients, handleOpenPopup }) => {
  return (
    <section className={burgerConstructorStyles.container}>
      <ConstructorList savedIngredients={savedIngredients} />
      <OrderBurger handleOpenPopup={handleOpenPopup}/>
    </section>
  );
};

BurgerConstructor.propTypes = {
  savedIngredients: PropTypes.array,
};

export default BurgerConstructor;
