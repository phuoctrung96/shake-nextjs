import React, { useEffect, useState, ReactNode, useRef } from 'react';
import styles from './modal.module.scss';
import ReactDOM from 'react-dom';
import Icon from '../icon/Icon';
import { ClickAwayListener } from '@mui/material';

type ModalType = {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  className?: string;
};

const Modal = ({ title, show, onClose, children, className = '' }: ModalType) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = show ? (
    <div className={`${styles.modalWrapper} ${className}`}>
      <ClickAwayListener onClickAway={onClose}>
        <div className={styles.modal}>
          <button onClick={onClose} className={styles.closeBtn}>
            <Icon name="Close" />
          </button>
          {title && <h2 className={styles.title}>{title}</h2>}
          <div className={styles.modalBody}>{children}</div>
        </div>
      </ClickAwayListener>
    </div>
  ) : null;

  if (isBrowser) {
    const modalRootEl = document.getElementById('modal-root');

    return modalRootEl ? ReactDOM.createPortal(modalContent, modalRootEl) : null;
  } else {
    return null;
  }
};

export default Modal;
