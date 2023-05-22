import React, { ReactNode } from 'react';
import styles from './skewBackground.module.css';

type SkewBackgroundProps = {
  children: ReactNode;
};

const SkewBackground = ({ children }: SkewBackgroundProps) => {
  return (
    <div className={styles.backgroundWrapper}>
      <div className={styles.background} />
      {children}
    </div>
  );
};

export default SkewBackground;
