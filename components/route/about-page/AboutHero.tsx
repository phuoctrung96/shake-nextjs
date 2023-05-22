import React from 'react';
import styles from './aboutHero.module.scss';
import Image from 'next/image';
import Container from '../../reusable/container/Container';
import Title from '../../reusable/title/Title';

const AboutHero = () => {
  return (
    <section className={styles.aboutHero}>
      <Container className={styles.container} data-aos="zoom-in" data-aos-duration="600">
        <div className={styles.content}>
          <div className={`${styles.aboutTrip} ${styles.aboutLogo}`}>
            <div>
              <Image src="/images/icons/tripadvisor-2.svg" alt="" width={41} height={27} />
            </div>
          </div>
          <div className={`${styles.aboutFacebook} ${styles.aboutLogo}`}>
            <div>
              <Image src="/images/icons/facebook-2.svg" alt="" width={24} height={43} />
            </div>
          </div>
          <div className={`${styles.aboutGoogle} ${styles.aboutLogo}`}>
            <div>
              <Image src="/images/icons/google-2.svg" alt="" width={35} height={36} />
            </div>
          </div>
          <div className={`${styles.aboutTrustRadius} ${styles.aboutLogo}`}>
            <div>
              <Image src="/images/icons/trustradius.svg" alt="" width={225} height={150} />
            </div>
          </div>
          <div className={`${styles.aboutYelp} ${styles.aboutLogo}`}>
            <div>
              <Image src="/images/icons/yelp-2.svg" alt="" width={35} height={46} />
            </div>
          </div>
          <div className={`${styles.aboutAirbnb} ${styles.aboutLogo}`}>
            <div>
              <Image src="/images/icons/airbnb-2.svg" alt="" width={34} height={37} />
            </div>
          </div>
          <Title as="h1">Mission statement</Title>
          <p>
            Our mission is to help businesses grow with online reviews, using both 1<sup>st</sup>{' '}
            party reviews on your business and 3<sup>rd</sup> party reviews on other businesses.
            We&apos;re creating a more transparent world by helping both consumers and companies be
            more aware of customer feedback.
          </p>
        </div>
        <div className={styles.imageWrapper}>
          <div className={styles.imageRadius}>
            <Image
              src="/images/about-us/company-mission-statement.jpeg"
              width={944}
              height={708}
              alt="Shake family members chatting"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutHero;
