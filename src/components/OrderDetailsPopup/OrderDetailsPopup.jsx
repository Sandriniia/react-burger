import React from 'react';
import { useSelector } from 'react-redux';
import orderDetailsStyles from './orderDetailsPopup.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderDetailsPopup = () => {
  const orderNumber = useSelector((state) => state.products.orderNumber);
  return (
    <>
      <h2 className={`${orderDetailsStyles.identifier} text text_type_digits-large`}>
        {orderNumber}
      </h2>
      <p className='mb-15 mt-8 text_type_main-medium'>идентификатор заказа</p>
      <div className={orderDetailsStyles.gradient}>
        <CheckMarkIcon type='primary' />
      </div>
      <p className='mb-2 mt-15 text text_type_main-default'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive'>
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
};

export default OrderDetailsPopup;
