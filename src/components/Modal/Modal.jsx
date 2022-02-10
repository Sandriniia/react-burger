import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

const Modal = ({ children, title, className, handleClosePopup }) => {
  return (
      createPortal(
        <ModalOverlay handleClosePopup={handleClosePopup}>
          <div className={`${className} text text_type_main-medium`}>
            <div className={`${modalStyles.header_popup} pt-10 pl-10 pr-10`}>
              <h1 className={`${modalStyles.title} text text_type_main-large`}>{title}</h1>
              <button className={modalStyles.button} onClick={handleClosePopup}>
                <CloseIcon type='primary' />
              </button>
            </div>
            {children}
          </div>
        </ModalOverlay>,
        document.getElementById('modal'),
      )
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  className: PropTypes.string.isRequired,
  handleClosePopup: PropTypes.func.isRequired,
};

export default Modal;

