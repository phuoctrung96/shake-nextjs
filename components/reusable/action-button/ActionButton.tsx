import React, { ReactNode } from 'react';
import styles from './actionButton.module.css';

type ActionButtonType = {
  handleClick: () => void;
  children: ReactNode;
  ariaLabel?: string;
  className?: string;
};

const ActionButton = ({
  handleClick,
  children,
  ariaLabel = '',
  className = '',
}: ActionButtonType) => {
  return (
    <button
      onClick={handleClick}
      aria-label={ariaLabel}
      className={`${styles.actionButton} ${className}`}
    >
      {children}
    </button>
  );
};

export default ActionButton;
