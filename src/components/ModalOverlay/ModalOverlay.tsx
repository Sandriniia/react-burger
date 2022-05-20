import React, { FC } from 'react';
import modalOverlayStyles from './modalOverlay.module.css';

type TModalOverlay = {
  onClose: () => void;
};

const ModalOverlay: FC<TModalOverlay> = ({ onClose }) => {
  return <div className={modalOverlayStyles.popup} onClick={onClose}></div>;
};

export default ModalOverlay;
