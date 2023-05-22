import React, { useState } from 'react';
import styles from './readMore.module.scss';
import BaseButton from '../base-button/BaseButton';

type ReadMoreType = {
  countOfCharacters: number;
  className?: string;
  children: string;
};

const ReadMore = ({ countOfCharacters, className = '', children }: ReadMoreType) => {
  const [collapsed, setCollapsed] = useState(true);

  const firstPart = children.substring(0, countOfCharacters);
  const secondPart = children.substring(countOfCharacters, children.length);

  const handleClick = () => {
    setCollapsed((collapsed) => !collapsed);
  };

  return (
    <div className={`${styles.readMoreWrapper} ${className}`}>
      <div className={styles.readMore}>
        {children.length > countOfCharacters ? (
          <>
            <>{firstPart}</>
            {collapsed ? (
              <>
                <>... </>
                <BaseButton viewType="menu" onClick={handleClick}>
                  {collapsed ? 'Read More' : 'Read Less'}
                </BaseButton>
              </>
            ) : (
              <>
                <>{secondPart} </>
                <BaseButton viewType="menu" onClick={handleClick}>
                  {collapsed ? 'Read More' : 'Read Less'}
                </BaseButton>
              </>
            )}
          </>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default ReadMore;
