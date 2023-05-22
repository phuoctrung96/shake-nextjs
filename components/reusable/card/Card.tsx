import React, { ReactNode } from 'react';
import styles from './card.module.scss';
import BlurredSection from '../blurred-section/BlurredSection';
import ClearbitImage from '../clearbit-image/ClearbitImage';
import ReadMore from '../read-more/ReadMore';

type CardType = {
  borderColor?: BorderColor;
  borderTop?: boolean;
  logo?: string;
  title?: string;
  mainCard?: boolean;
  description?: string;
  blurred?: boolean;
  blurValue?: number;
  blurLinkText?: string;
  truncateDescription?: boolean;
  className?: string;
  children: ReactNode;
};

export type BorderColor = 'blue' | 'orange' | 'red';

const Card = ({
  logo,
  title,
  mainCard,
  description,
  borderColor,
  borderTop,
  blurred = false,
  blurValue = 3,
  blurLinkText,
  truncateDescription = false,
  children,
  className = '',
}: CardType) => {
  return (
    <div
      className={`${styles.cardWrapper} ${
        borderColor ? styles['borderColor-' + borderColor] : ''
      } ${className}`}
    >
      <BlurredSection active={blurred} blurValue={blurValue} linkText={blurLinkText} />
      {logo && (
        <ClearbitImage url={logo} width={66} className={styles.logoWrapper} disablePlaceholder />
      )}
      {title &&
        (mainCard ? (
          <h2 className={`${styles.title} ${styles.mainCard}`}>{title}</h2>
        ) : (
          <h3 className={`${styles.title}`}>{title}</h3>
        ))}
      {description && truncateDescription && (
        <ReadMore
          countOfCharacters={210}
          className={`${styles.description} ${mainCard && styles.mainCard}`}
        >
          {description}
        </ReadMore>
      )}
      {description && !truncateDescription && (
        <p className={`${styles.description} ${mainCard && styles.mainCard}`}>{description}</p>
      )}
      {children}
      {borderTop && <div className={`${styles.topBorder} ${styles['topBorder-' + borderColor]}`} />}
    </div>
  );
};

export default Card;
