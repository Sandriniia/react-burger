import React from 'react';
import PropTypes from 'prop-types';
import orderBurgerStyles from './orderBurger.module.css';
import subtract from '../../images/subtract.png';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderBurger = ({ handleOpenOrderDetailsPopup }) => {
  return (
    <section className={orderBurgerStyles.order_container}>
      <p className={`${orderBurgerStyles.price} text text_type_digits-medium`}>610</p>
      <img className={orderBurgerStyles.image} src={subtract} alt='gem' />
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
