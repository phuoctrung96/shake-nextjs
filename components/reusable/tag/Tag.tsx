import React from 'react';
import styles from './tag.module.scss';

type TagType = {
  name: string;
};

const Tag = ({ name }: TagType) => {
  return <span className={styles.tag}>{name}</span>;
};

export default Tag;
