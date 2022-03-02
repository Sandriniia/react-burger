import React from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burgerConstructor.module.css';
import ConstructorList from '../ConstructorList/ConstructorList';
import OrderBurger from '../OrderBurger/OrderBurger';

const BurgerConstructor = ({ handleOpenOrderDetailsPopupAndGetOrderNumber }) => {

  return (
    <section className={`${burgerConstructorStyles.container} mt-15`}>
      <ConstructorList />
      <OrderBurger
        handleOpenOrderDetailsPopupAndGetOrderNumber={handleOpenOrderDetailsPopupAndGetOrderNumber}
      />
    </section>
  );
};

BurgerConstructor.propTypes = {
  handleOpenOrderDetailsPopupAndGetOrderNumber: PropTypes.func.isRequired,
};

export default BurgerConstructor;
