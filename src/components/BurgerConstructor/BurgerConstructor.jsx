import React from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burgerConstructor.module.css';
import ConstructorList from '../ConstructorList/ConstructorList';
import OrderBurger from '../OrderBurger/OrderBurger';
import { ingredientPropType } from '../../utils/types';

const BurgerConstructor = ({ handleOpenOrderDetailsPopup, products }) => {
  return (
    <section className={`${burgerConstructorStyles.container} mt-15`}>
      <ConstructorList products={products} />
      <OrderBurger handleOpenOrderDetailsPopup={handleOpenOrderDetailsPopup} />
    </section>
  );
};

BurgerConstructor.propTypes = {
  handleOpenOrderDetailsPopup: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export default BurgerConstructor;

