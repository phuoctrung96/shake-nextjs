import React from 'react';
import styles from './loader.module.scss';

type LoaderType = {
  type?: 'primary' | 'secondary';
  className?: string;
};

const Loader = ({ type = 'primary', className = '' }: LoaderType) => {
  return type === 'primary' ? (
    <div className={`${styles.loader} ${className}`}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  ) : (
    <div className={`${styles.loaderSecondary} ${className}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
