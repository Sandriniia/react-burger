import React from 'react';
import PropTypes from 'prop-types'
import mainStyles from './main.module.css';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

const Main = ({ handleAddIngredient, savedIngredients, products }) => {
  
  return (
    <main className={mainStyles.main}>
      <BurgerIngredients handleAddIngredient={handleAddIngredient} products={products}/>
      <BurgerConstructor savedIngredients={savedIngredients} />
    </main>
  );
};

Main.propTypes = {
  handleAddIngredient: PropTypes.func,
  savedIngredients: PropTypes.array,
  products: PropTypes.array,
}

export default Main;
