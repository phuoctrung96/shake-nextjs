import React, { ReactNode } from 'react';
import styles from './container.module.css';

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

const Container = ({ children, className = '', ...rest }: ContainerProps) => {
  return (
    <div className={`container  ${styles.container} ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default Container;
