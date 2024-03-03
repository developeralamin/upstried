import React from 'react';
import styles from './Modal.module.scss';

export interface ModalProps {
  children: React.ReactNode;
  modalHeaderTitle: string;
  show: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <>
      {props.show ? (
        <div className={styles.Modal}>
          <div className={styles.ModalContent}>
            <div className={styles.ModalHeader}>
              <h4 className={styles.ModalTitle}>{props.modalHeaderTitle}</h4>
              <button className={styles.ModalClose} onClick={props.onClose}>
                <img src="/icons/close.png" alt="Close" />
              </button>
            </div>
            {props.children}
            <div className={styles.ModalBody}></div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Modal;

export interface ModalBodyrProps {
  children: React.ReactNode;
}

export const ModalBody: React.FC<ModalBodyrProps> = (props) => {
  return <>{props.children}</>;
};
