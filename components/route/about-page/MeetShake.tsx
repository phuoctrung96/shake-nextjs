import React from 'react';
import styles from './meetShake.module.scss';
import Image from 'next/image';
import Container from '../../reusable/container/Container';
import Title from '../../reusable/title/Title';

const MeetShake = () => {
  return (
    <section className={styles.meetShakeWrapper}>
      <Container className={styles.container}>
        <div className={styles.content}>
          <Title as="h2">Meet the Shakers</Title>
          <p>
            We pride ourselves in hiring the best talent globally and creating an environment where we can do our best work. We believe the best work happens when given lots of uninterrupted time that&apos;s free of distractions, and an asynchronous culture with less meetings.
          </p>
        </div>
        <div className={styles.imageSection}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/about-us/company-retreat.jpg"
              width={1120}
              height={684}
              alt="Shake members at company retreat in Thailand"
            />
          </div>
          <p>Our 2022 company retreat in Thailand!</p>
        </div>
      </Container>
    </section>
  );
};

export default MeetShake;
