import React from 'react';
import styles from './ourValues.module.scss';
import Container from '../../reusable/container/Container';
import SectionTitle from '../../reusable/section-title/SectionTitle';

const OUR_VALUES = [
  {
    id: 1,
    title: 'Autonomy',
    description:
      'As Shakers, we take ownership for our work and have the freedom to make decisions towards our goals. We trust each and every team member and create a safe and open environment by being a goal oriented company.',
  },
  {
    id: 2,
    title: 'Healthy Team Spirit',
    description:
      'Communication is key for Shakers - helping each other reach our collective goals by being open to new opinions, asking questions and involving everyone in key decisions.',
  },
  {
    id: 3,
    title: 'Continuous Learning',
    description:
      'Shakers believe in knowledge sharing, getting out of our comfort zone and learning new things. We embrace failure as part of the learning process.',
  },
  {
    id: 4,
    title: 'Customer Commitment',
    description:
      'As a bootstrapped company, Shakers inherently treat our customers as partners and not just another number. We go the extra mile to help our customers at every level of our interactions',
  },
  {
    id: 5,
    title: 'Sane Growth',
    description:
      "Startups don't have to be crazy at work, and as Shakers we take this to heart. We deliver for our customers while having a healthy work/life balance and asynchronous work culture. We find creative solutions and do more with less.",
  },
];

const OurValues = () => {
  return (
    <section className={styles.faqWrapper}>
      <Container>
        <SectionTitle title="Our Values" className={styles.sectionHeader}>
          We&apos;ve been a fully-remote company since inception, and this permeates our entire culture and values.
        </SectionTitle>
        <div className={styles.faq}>
          {OUR_VALUES.map((valueItem) => (
            <div
              key={valueItem.id}
              className={styles.faqItem}
              data-aos="fade-right"
              data-aos-offset="150"
              data-aos-duration="1000"
            >
              <h3 className={`${styles.itemTitle} d-flex align-items-center justify-start`}>
                <span className={styles.itemCount}>{valueItem.id}</span>
                {valueItem.title}
              </h3>
              <p className={styles.itemText}>{valueItem.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default OurValues;
