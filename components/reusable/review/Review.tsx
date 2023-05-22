import React from 'react';
import styles from './review.module.scss';
import { formatDate } from '../../../utils/utils';
import ReadMore from '../read-more/ReadMore';
import StarsRating from '../stars-rating/StarsRating';

type ReviewType = {
  title: string;
  rating: number;
  date: string;
  content: string;
};

const Review = ({ title, rating, date, content }: ReviewType) => {
  return (
    <section className={styles.reviewWrapper}>
      <div className={styles.reviewHeader}>
        <div className={styles.reviewAvatar}>{title.charAt(0)}</div>
        <div className={styles.reviewData}>
          <h2>{title}</h2>
          <div className={styles.ratingWrapper}>
            <StarsRating rating={rating} />
            <p>{formatDate(date)}</p>
          </div>
        </div>
      </div>
      <div className={styles.reviewContent}>
        {
          <ReadMore countOfCharacters={200} className={styles.readMore}>
            {content}
          </ReadMore>
        }
      </div>
    </section>
  );
};

export default Review;
