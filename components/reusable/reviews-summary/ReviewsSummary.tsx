import React from 'react';
import styles from './reviewsSummary.module.scss';
import { shortenNumber } from '../../../utils/utils';
import StarsRating from '../stars-rating/StarsRating';

type ReviewsSummaryType = {
  rating: number;
  reviewsTotalCount: number;
};

const ReviewsSummary = ({ rating, reviewsTotalCount }: ReviewsSummaryType) => {
  return (
    <div className={styles.reivewSummaryWrapper}>
      <h2>{rating}</h2>
      <div className={styles.content}>
        <StarsRating rating={rating} />
        <p className={styles.reviewsCount}>
          Based on <strong>{shortenNumber(reviewsTotalCount, 1000)} reviews</strong>
        </p>
      </div>
    </div>
  );
};

export default ReviewsSummary;
