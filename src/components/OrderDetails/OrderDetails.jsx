import React from 'react';
import PropTypes from 'prop-types';
import orderDetailsStyles from './orderDetails.module.css';
import Modal from '../Modal/Modal';
import done_image from '../../images/done.png';

const OrderDetails = ({ identifier, handleClosePopup }) => {
  return (
    <Modal className={orderDetailsStyles.order_popup} handleClosePopup={handleClosePopup}>
      <h2 className={`${orderDetailsStyles.identifier} text text_type_digits-large`}>
        {identifier}
      </h2>
      <p className={`${orderDetailsStyles.subtitle} text_type_main-medium`}>идентификатор заказа</p>
      <img className={orderDetailsStyles.image} src={done_image} alt='check mark' />
      <p className={`${orderDetailsStyles.text} text_type_main-default`}>
        Ваш заказ начали готовить
      </p>
      <p
        className={`${orderDetailsStyles.text} ${orderDetailsStyles.text_second} text_type_main-default`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </Modal>
  );
};

OrderDetails.propTypes = {
  identifier: PropTypes.string.isRequired,
  handleClosePopup: PropTypes.func.isRequired,
};

export default OrderDetails;
