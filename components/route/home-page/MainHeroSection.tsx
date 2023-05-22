import React, { useEffect, useState } from 'react';
import styles from './mainHeroSection.module.scss';
import Container from '../../reusable/container/Container';
import HeroLookupForm from './HeroLookupForm';
import Title from '../../reusable/title/Title';
import Icon from '../../reusable/icon/Icon';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import debounce from 'lodash/debounce';

const HeroGlobe = dynamic(import('./HeroGlobe'), {
  ssr: false,
});

const STARS = [
  'S',
  'L',
  'L',
  'M',
  'L',
  'M',
  'L',
  'S',
  'S',
  'S',
  'S',
  'S',
  'M',
  'S',
  'L',
  'M',
  'L',
  'S',
  'L',
  'M',
  'L',
  'L',
  'L',
  'S',
  'L',
  'M',
];

const TRY_COMPANIES = [
  { title: "McDonald's", logo: 'mcdonalds.png', link: 'mcdonalds' },
  { title: 'Starbucks', logo: 'starbucks.png', link: 'starbucks' },
  { title: 'Five Guys', logo: 'fiveguys.png', link: 'five-guys' },
];

const MainHeroSection = () => {
  const [showGlobe, setShowGlobe] = useState(false);

  useEffect(() => {
    const handleResize = debounce(() => {
      const newWidth = window.innerWidth;

      newWidth >= 992 ? setShowGlobe(true) : setShowGlobe(false);
    }, 200);

    addEventListener('resize', handleResize);

    const newWidth = window.innerWidth;

    setShowGlobe(newWidth >= 992 ? true : false);

    () => {
      removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className={styles.mainHero}>
      <div className={styles.starsWrapper}>
        {STARS.map((star, index) => (
          <Icon
            key={index}
            name="StarSky"
            className={`${styles.star} ${styles['star' + index]} ${styles['starSize' + star]}`}
          />
        ))}
      </div>
      <Container>
        <div className={styles.mainContent}>
          <Title as="h1">Analyze any company with online reviews.</Title>
          <p className={styles.content}>
            Shake is the fastest, easiest way to measure customer experience for any company using
            online reviews.
          </p>
          <HeroLookupForm />
          <div className={styles.tryCompanies}>
            <p>
              <Icon name="GraphStats" />
              Or try these companies
            </p>
            <div className={styles.imageTagsWrapper}>
              {TRY_COMPANIES.map(({ title, link, logo }) => (
                <Link key={title} href={`/reviews/${link}`} passHref className={styles.imageTag}>
                  <Image src={'/images/home/' + logo} width={18} height={18} alt="" priority />
                  <p>{title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
      {showGlobe && (
        <div className={styles.noOverflow}>
          <HeroGlobe className={styles.globeWrapper} />
        </div>
      )}
    </section>
  );
};

export default MainHeroSection;
