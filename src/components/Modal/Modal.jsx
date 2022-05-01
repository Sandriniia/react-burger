import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

const Modal = ({ children, title, className, onClose }) => {
  useEffect(() => {
    const escClosePopup = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', escClosePopup);

    return () => window.removeEventListener('keydown', escClosePopup);
  }, [onClose]);

  return createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={`${className} ${modalStyles.modal} text text_type_main-medium`}>
        <div className={`${modalStyles.header_popup} pt-10 pl-10 pr-10`}>
          <h1 className={`${modalStyles.title} text text_type_main-large`}>{title}</h1>
          <button className={modalStyles.button} onClick={onClose}>
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
  onClose: PropTypes.func.isRequired,
};

export default Modal;
