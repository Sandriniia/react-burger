import React from 'react';
import PropTypes from 'prop-types';
import orderDetailsStyles from './orderDetails.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import done_image from '../../images/done.png';

const OrderDetails = ({ identifier, handleClosePopup }) => {
  return (
    <ModalOverlay className={orderDetailsStyles.order_popup} handleClosePopup={handleClosePopup}>
      <h2 className={`${orderDetailsStyles.identifier} text text_type_digits-large`}>
        {identifier}
      </h2>
      <p className={orderDetailsStyles.subtitle}>идентификатор заказа</p>
      <img className={orderDetailsStyles.image} src={done_image} alt='check mark' />
      <p className={orderDetailsStyles.text}>Ваш заказ начали готовить</p>
      <p className={`${orderDetailsStyles.text} ${orderDetailsStyles.text_second}`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </ModalOverlay>
  );
};

OrderDetails.propTypes = {
  identifier: PropTypes.string.isRequired,
  handleClosePopup: PropTypes.func.isRequired,
};

export default OrderDetails;
