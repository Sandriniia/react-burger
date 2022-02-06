import React from 'react';
import { createPortal } from 'react-dom';
import modalOverlayStyles from './modalOverlay.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const ModalOverlay = ({ children, title, className }) => {
  return (
    <>
      {createPortal(
        <div className={modalOverlayStyles.popup}>
          <div className={`${className} text text_type_main-medium`}>
            <div className={modalOverlayStyles.header_popup}>
              <h1>{title}</h1>
              <CloseIcon type='primary' />
            </div>
            {children}
          </div>
        </div>,
        document.getElementById('modal'),
      )}
    </>
  );
};

export default ModalOverlay;
