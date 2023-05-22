import React, { ReactNode } from 'react';
import styles from './title.module.css';

type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type TitleProps = {
  as: HeadingType;
  children: ReactNode;
  className?: string;
};

const Title = ({ as, children, className = '', ...rest }: TitleProps) => {
  const Component = as || 'h1';

  return (
    <Component className={`${styles['title-' + as]} ${className}`} {...rest}>
      {children}
    </Component>
  );
};

export default Title;
