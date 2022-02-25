import React from 'react';
import PropTypes from 'prop-types';
import orderBurgerStyles from './orderBurger.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { priceStatePropType } from '../../utils/types';

const OrderBurger = ({ handleOpenOrderDetailsPopupAndGetOrderNumber, priceState }) => {
  const { mainPrice, bunsPrice } = priceState;
  const totalPrice = mainPrice + bunsPrice;

  return (
    <section className={orderBurgerStyles.order_container}>
      <div className={`${orderBurgerStyles.sum} mr-10`}>
        <p className='text text_type_digits-medium mr-2'>{totalPrice}</p>
        <CurrencyIcon type='primary' />
      </div>
      <Button type='primary' size='large' onClick={handleOpenOrderDetailsPopupAndGetOrderNumber}>
        Оформить заказ
      </Button>
    </section>
  );
};

OrderBurger.propTypes = {
  handleOpenOrderDetailsPopupAndGetOrderNumber: PropTypes.func.isRequired,
  priceState: priceStatePropType.isRequired,
};

export default OrderBurger;
