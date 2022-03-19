import React from 'react';
import PropTypes from 'prop-types';
import modalOverlayStyles from './modalOverlay.module.css';

const ModalOverlay = ({ onClose}) => {
  return (
    <div
      className={modalOverlayStyles.popup}
      onClick={onClose}
    ></div>
  );
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
