import React from 'react';
import mainStyles from './main.module.css';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

const Main = () => {
  return (
    <main className={mainStyles.main}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  );
};

export default Main;
