import React from 'react';
import PropTypes from 'prop-types';
import modalOverlayStyles from './modalOverlay.module.css';

const ModalOverlay = ({ handleClosePopup }) => {
  return <div className={modalOverlayStyles.popup} onClick={handleClosePopup}></div>;
};

ModalOverlay.propStyles = {
  handleClosePopup: PropTypes.func.isRequired,
};

export default ModalOverlay;
