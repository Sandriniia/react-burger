import React from 'react';
import PropTypes from 'prop-types';
import modalOverlayStyles from './modalOverlay.module.css';

const ModalOverlay = ({ handleClosePopup, children }) => {
  return (
    <div className={modalOverlayStyles.popup} onClick={handleClosePopup}>{children}</div>
  )
}

ModalOverlay.propStyles = {
  handleClosePopup: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default ModalOverlay;