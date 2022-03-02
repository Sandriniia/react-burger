import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { popupActions } from '../../services/slices/popupSlice';
import { productsActions } from '../../services/slices/productsSlice';

const Modal = ({ children, title, className }) => {
  const dispatch = useDispatch();

  const handleClosePopupAndDeleteCurrentProduct = () => {
    dispatch(popupActions.closePopups());
    dispatch(productsActions.getCurrentProduct());
  };

  return createPortal(
    <>
      <ModalOverlay
        handleClosePopupAndDeleteCurrentProduct={handleClosePopupAndDeleteCurrentProduct}
      />
      <div className={`${className} ${modalStyles.modal} text text_type_main-medium`}>
        <div className={`${modalStyles.header_popup} pt-10 pl-10 pr-10`}>
          <h1 className={`${modalStyles.title} text text_type_main-large`}>{title}</h1>
          <button className={modalStyles.button} onClick={handleClosePopupAndDeleteCurrentProduct}>
            <CloseIcon type='primary' />
          </button>
        </div>
        {children}
      </div>
    </>,
    document.getElementById('modal'),
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  className: PropTypes.string.isRequired,
};

export default Modal;
