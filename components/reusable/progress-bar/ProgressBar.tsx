import React from 'react';
import styles from './progressBar.module.scss';

type ProgressBarProps = {
  progress: number;
  totalNumber: number;
};

const ProgressBar = ({ progress, totalNumber }: ProgressBarProps) => {
  return (
    <progress
      value={((progress / totalNumber) * 100).toFixed(0)}
      max="100"
      className={styles.progressBar}
    ></progress>
  );
};

export default ProgressBar;
