import React from 'react'
import orderDetailsStyles from './orderDetails.module.css'
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import done_image from '../../images/done.png'

const OrderDetails = ({identifier}) => {
  return (
    <ModalOverlay className={orderDetailsStyles.order_popup}>
        <h2 className={`${orderDetailsStyles.identifier} text text_type_digits-large`}>{identifier}</h2>
        <p className={orderDetailsStyles.subtitle}>идентификатор заказа</p>
        <img className={orderDetailsStyles.image} src={done_image} alt='check mark' />
        <p className={orderDetailsStyles.text}>Ваш заказ начали готовить</p>
        <p className={`${orderDetailsStyles.text} ${orderDetailsStyles.text_second}`}>Дождитесь готовности на орбитальной станции</p>
    </ModalOverlay>
  )
}

export default OrderDetails;