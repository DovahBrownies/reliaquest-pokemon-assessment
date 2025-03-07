import React, { ReactNode } from 'react';
import { createUseStyles } from 'react-jss';
import styles from './Modal.styles';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, closeModal, children }: ModalProps) => {
  const classes = useStyles();

  if (!isOpen) return null;

  return (
    <div className={classes.overlay} onClick={closeModal}>
      <div className={classes.modal} onClick={(ev) => ev.stopPropagation()}>
        <button className={classes.closeButton} onClick={closeModal}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

const useStyles = createUseStyles(
  styles,
  { name: 'ModalComponent' }
);

export default Modal;