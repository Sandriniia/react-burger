import React from 'react';
import PropTypes from 'prop-types';
import orderBurgerStyles from './orderBurger.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderBurger = ({ handleOpenOrderDetailsPopup, priceState }) => {
  const { mainPrice, bunsPrice } = priceState;
  const totalPrice = mainPrice + bunsPrice;

  return (
    <section className={orderBurgerStyles.order_container}>
      <div className={`${orderBurgerStyles.sum} mr-10`}>
        <p className='text text_type_digits-medium mr-2'>{totalPrice}</p>
        <CurrencyIcon type='primary' />
      </div>
      <Button type='primary' size='large' onClick={handleOpenOrderDetailsPopup}>
        Оформить заказ
      </Button>
    </section>
  );
};

OrderBurger.propTypes = {
  handleOpenOrderDetailsPopup: PropTypes.func.isRequired,
};

export default OrderBurger;
