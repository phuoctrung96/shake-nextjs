import React, { useRef } from 'react';
import Title from '../../reusable/title/Title';
import styles from './reviewsSection.module.css';
import Container from '../../reusable/container/Container';
import { useScript } from '../../hooks/useScript';

const attributesMap = new Map<string, string>();
attributesMap.set(
  'data-token',
  'eyJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnQiOiJtZSIsImhvc3QiOiJtZS5yZXZpZXdzaGFrZS5jb20iLCJzdG9yZSI6MSwid2lkZ2V0Ijo3LCJpYXQiOjE2NjI1Mjg4MTR9.YAba1F8gmdMlKG9BDrGYczNoT3ZLuc_okusv8nl09Kw'
);
attributesMap.set('data-id', '7');

const ReviewsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  useScript('https://me.reviewshake.com/widget-embed.js', attributesMap, ref);

  return (
    <div className={styles.testimonials}>
      <Container>
        <div className="row">
          <div className="col-12" data-aos="fade-up">
            <Title as="h2">What people are saying about us</Title>
          </div>
        </div>
        <div className="row">
          <div className={`col-12 ${styles.reviews}`} ref={ref} data-aos="fade-up">
            <div id="review-widget-7"></div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ReviewsSection;
