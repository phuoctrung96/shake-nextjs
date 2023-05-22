import React from 'react';
import styles from './results.module.scss';
import Container from '../../reusable/container/Container';
import Title from '../../reusable/title/Title';

const Results = () => {
  return (
    <section className={styles.resultsWrapper}>
      <Container>
        <div className={styles.heading}>
          <Title as="h2">What we stand for</Title>
          <p>
            Being bootstrapped (not venture-backed) and fully remote, we don&apos;t strive for growth at all costs, and are building a company that we can be proud of, and enjoy working for.
          </p>
        </div>
        <div className={styles.resultsData}>
          <div>
            <Title as="h3">2018</Title>
            <p>Year we were founded</p>
          </div>
          <div>
            <Title as="h3">30+</Title>
            <p>Members in our remote team</p>
          </div>
          <div>
            <Title as="h3">20+</Title>
            <p>Countries represented</p>
          </div>
          <div>
            <Title as="h3">1,000+</Title>
            <p>Customers using our products</p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Results;
