import React from 'react';
import mainStyles from './main.module.css';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

const Main = ({ handleAddIngredient, savedIngredients }) => {
  console.log(savedIngredients);
  return (
    <main className={mainStyles.main}>
      <BurgerIngredients handleAddIngredient={handleAddIngredient} />
      <BurgerConstructor savedIngredients={savedIngredients} />
    </main>
  );
};

export default Main;
