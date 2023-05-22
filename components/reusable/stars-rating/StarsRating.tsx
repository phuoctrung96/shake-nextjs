import React from 'react';
import Icon from '../icon/Icon';
import styles from './starsRating.module.scss';

type StartRatingType = {
  rating: number;
  className?: string;
};

const renderFullStars = (rating: number) => {
  let remainingRating = rating;
  let stars = [];

  for (let i = 0; i < 5; i++) {
    const activeStarValue = remainingRating >= 1 ? 1 : remainingRating;
    stars.push(
      <div className={styles.iconWr} key={i}>
        <Icon
          name="Star"
          style={{ clip: 'rect(0px, ' + 16 * activeStarValue + 'px, 16px, 0px)' }}
        />
      </div>
    );

    remainingRating = remainingRating - 1;
  }

  return stars;
};

const StarsRating = ({ rating, className = '' }: StartRatingType) => {
  return (
    <div className={`${styles.starsRatingWrapper} ${className}`}>
      <div className={styles.emptyStars}>
        {[...Array(5)].map((_, index) => (
          <div className={styles.iconWr} key={index}>
            <Icon name="StarEmpty" />
          </div>
        ))}
      </div>
      <div className={styles.fullStars}>{renderFullStars(rating)}</div>
    </div>
  );
};

export default StarsRating;
