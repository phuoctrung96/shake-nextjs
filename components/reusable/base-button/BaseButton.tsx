import React, { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import styles from './baseButton.module.scss';

type BaseButtonProps = {
  children: ReactNode;
  handleClick?: () => void;
  handleMouseEnter?: () => void;
  disabled?: boolean;
  className?: string;
  viewType?: 'primary' | 'secondary' | 'menu' | 'transparent';
};

const BaseButton = (
  {
    children,
    handleClick = () => {},
    handleMouseEnter = () => {},
    viewType = 'primary',
    className = '',
    ...rest
  }: BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>,
  ref: any
) => {
  return (
    <button
      className={`${styles.baseButton} ${styles[viewType]} ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      ref={ref}
      {...rest}
    >
      {children}
    </button>
  );
};

export default forwardRef(BaseButton);
