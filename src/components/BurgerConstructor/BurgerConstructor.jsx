import React from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burgerConstructor.module.css';
import ConstructorList from '../ConstructorList/ConstructorList';
import OrderBurger from '../OrderBurger/OrderBurger';

const BurgerConstructor = ({ handleOpenOrderDetailsPopup, products }) => {
  return (
    <section className={burgerConstructorStyles.container}>
      <ConstructorList products={products}/>
      <OrderBurger handleOpenOrderDetailsPopup={handleOpenOrderDetailsPopup} />
    </section>
  );
};

BurgerConstructor.propTypes = {
  handleOpenOrderDetailsPopup: PropTypes.func.isRequired,
};

BurgerConstructor.propTypes = {
  products: PropTypes.array.isRequired,
};

export default BurgerConstructor;
