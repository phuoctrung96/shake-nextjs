import React from 'react';
import styles from './mainContent.module.scss';
import Image from 'next/image';
import Container from '../../reusable/container/Container';
import SectionTitle from '../../reusable/section-title/SectionTitle';
import Title from '../../reusable/title/Title';

const TOPICS = [
  {
    title: 'Consultancies',
    description:
      'Consultancies use online reviews to best advise their clients on strategy and where the market is heading.',
    image: {
      filename: 'consultancies.png',
      alt: 'Consultancy conversation behind a desk',
      width: 300,
      height: 199,
    },
  },
  {
    title: 'Asset management',
    description:
      'Hedge funds, private equity, venture capitalists and more use online reviews to track and measure company performance.',
  },
  {
    title: 'Reputation management',
    description:
      'The reputation management industry leverages reviews as a tool to build reputation and trust for their clients.',
    image: {
      filename: 'small-business.png',
      alt: 'Man watering a pot with money plant',
      width: 196,
      height: 172,
    },
  },
  {
    title: 'Small businesses',
    description:
      'Online reviews help small businesses build trust and drive social proof with their audience, which leads to more sales.',
  },
  {
    title: 'Enterprise',
    description:
      'Fortune 500 companies and beyond leverage online reviews to derive consumer insights and beat the competition.',
  },
  {
    title: 'Risk management',
    description:
      'Risk managers from credit processors to insurance companies use online reviews to measure and build risk profiles.',
  },
  {
    title: 'Analytics & Competitor Intel',
    description:
      'Online reviews provide unparalled strategic insights when analyzed with machine learning and natural language processing.',
    image: {
      filename: 'analytics.png',
      alt: 'Couple of people studying an analytics report',
      width: 214,
      height: 225,
    },
  },
  {
    title: 'Marketplaces',
    description:
      'Marketplaces use third-party reviews to drive trust and social proof for merchants on their platforms, converting more sales.',
  },
  {
    title: 'E-commerce',
    description:
      'Leading e-commerce players use online reviews to analyze current and future trends to improve existing and future products.',
  },
];

const MainContent = () => {
  return (
    <section className={styles.mainContentWrapper}>
      <Container>
        <SectionTitle title="Drive revenue with online reviews">
          Unleash growth using both 1<sup>st</sup> party reviews on your business and 3<sup>rd</sup> party reviews on
          other businesses.
        </SectionTitle>
        <div className={styles.topicsGrid}>
          {TOPICS.map(({ title, description, image }, index) => (
            <div key={index} className={`${styles.card} grid${index + 1}`}>
              <Title as="h3">{title}</Title>
              <p>{description}</p>
              {image && (
                <div className={`${styles.imageWrapper}`}>
                  <Image
                    src={`/images/home/${image.filename}`}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default MainContent;
