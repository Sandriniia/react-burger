import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import modalOverlayStyles from './modalOverlay.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const ModalOverlay = ({ children, title, className, handleClosePopup }) => {
  return (
    <>
      {createPortal(
        <div className={modalOverlayStyles.popup} onClick={handleClosePopup}>
          <div className={`${className} text text_type_main-medium`}>
            <div className={modalOverlayStyles.header_popup}>
              <h1 className={modalOverlayStyles.title}>{title}</h1>
              <button className={modalOverlayStyles.button} onClick={handleClosePopup}>
                <CloseIcon type='primary' />
              </button>
            </div>
            {children}
          </div>
        </div>,
        document.getElementById('modal'),
      )}
    </>
  );
};

ModalOverlay.propTypes = {
  children: PropTypes.array.isRequired,
  title: PropTypes.string,
  className: PropTypes.string.isRequired,
  handleClosePopup: PropTypes.func.isRequired,
};

export default ModalOverlay;
