import React from 'react';
import burgerConstructorStyles from './burgerConstructor.module.css';
import ConstructorList from '../ConstructorList/ConstructorList';
import OrderBurger from '../OrderBurger/OrderBurger';

const BurgerConstructor = () => {

  return (
    <section className={`${burgerConstructorStyles.container} mt-15`}>
      <ConstructorList />
      <OrderBurger/>
    </section>
  );
};

export default BurgerConstructor;
