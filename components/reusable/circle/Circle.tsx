import Image from 'next/image';
import React, { FC } from 'react';
import styles from './circle.module.css';

const Circle = () => {
  return (
    <div className={styles.circle}>
      <Image src="/images/decorators/circle.svg" width={1440} height={138} alt="" priority />
    </div>
  );
};

export default Circle;
