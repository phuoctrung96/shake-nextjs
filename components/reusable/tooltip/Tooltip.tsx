import React from 'react';
import styles from './tooltip.module.scss';

const Tooltip = ({ text, children }: any) => {
  return (
    <div className={styles.tooltipWrapper}>
      {children}
      <div className={styles.tooltip} role="tooltip">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
