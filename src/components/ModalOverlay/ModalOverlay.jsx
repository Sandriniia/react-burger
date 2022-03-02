import React from 'react';
import PropTypes from 'prop-types';
import modalOverlayStyles from './modalOverlay.module.css';

const ModalOverlay = ({ handleClosePopupAndDeleteCurrentProduct }) => {
  return (
    <div
      className={modalOverlayStyles.popup}
      onClick={handleClosePopupAndDeleteCurrentProduct}
    ></div>
  );
};

ModalOverlay.propStyles = {
  handleClosePopupAndDeleteCurrentProduct: PropTypes.func.isRequired,
};

export default ModalOverlay;
