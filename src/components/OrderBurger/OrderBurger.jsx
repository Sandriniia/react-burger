import React from 'react';
import orderBurgerStyles from './orderBurger.module.css';
import subtract from '../../images/subtract.png';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderBurger = () => {
  return (
    <section className={orderBurgerStyles.order_container}>
      <p className={`${orderBurgerStyles.price} text text_type_digits-medium`}>610</p>
      <img className={orderBurgerStyles.image} src={subtract} alt='gem' />
      <Button type='primary' size='large'>
        Оформить заказ
      </Button>
    </section>
  );
};

export default OrderBurger;
