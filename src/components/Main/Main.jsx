import React from 'react';
import PropTypes from 'prop-types';
import mainStyles from './main.module.css';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

const Main = ({ handleOpenOrderDetailsPopupAndGetOrderNumber, handleOpenIngredientDetailsPopup }) => {
  return (
    <main className={mainStyles.main}>
      <BurgerIngredients
        handleOpenIngredientDetailsPopup={handleOpenIngredientDetailsPopup}
      />
      <BurgerConstructor
        handleOpenOrderDetailsPopupAndGetOrderNumber={handleOpenOrderDetailsPopupAndGetOrderNumber}
      />
    </main>
  );
};

Main.propTypes = {
  handleOpenOrderDetailsPopupAndGetOrderNumber: PropTypes.func.isRequired,
  handleOpenIngredientDetailsPopup: PropTypes.func.isRequired,
};

export default Main;
