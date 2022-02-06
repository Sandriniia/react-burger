import React from 'react';
import modalOverlayStyles from './modalOverlay.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const ModalOverlay = ({ children, title }) => {
  return (
    <div className={modalOverlayStyles.popup}>
      <div className={modalOverlayStyles.header_popup}>
        <h1>{title}</h1>
        <CloseIcon type='primary' />
      </div>
      {children}
    </div>
  );
};

export default ModalOverlay;
