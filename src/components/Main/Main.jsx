import React from 'react';
import PropTypes from 'prop-types';
import mainStyles from './main.module.css';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

const Main = ({ products, handleOpenOrderDetailsPopup, handleOpenIngredientDetailsPopup }) => {
  return (
    <main className={mainStyles.main}>
      <BurgerIngredients
        products={products}
        handleOpenIngredientDetailsPopup={handleOpenIngredientDetailsPopup}
      />
      <BurgerConstructor handleOpenOrderDetailsPopup={handleOpenOrderDetailsPopup} />
    </main>
  );
};

Main.propTypes = {
  handleOpenOrderDetailsPopup: PropTypes.func.isRequired,
  handleOpenIngredientDetailsPopup: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};

export default Main;
