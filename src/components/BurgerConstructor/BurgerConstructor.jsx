import React from 'react';
import burgerConstructorStyles from './burgerConstructor.module.css';
import ConstructorList from '../ConstructorList/ConstructorList';
import OrderBurger from '../OrderBurger/OrderBurger';

const BurgerConstructor = ({ savedIngredients }) => {
  return (
    <section className={burgerConstructorStyles.container}>
      <ConstructorList savedIngredients={savedIngredients} />
      <OrderBurger />
    </section>
  );
};

export default BurgerConstructor;
