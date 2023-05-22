import Image from 'next/image';
import React from 'react';
import Container from '../../reusable/container/Container';
import styles from './errorPage.module.scss';

type ErrorPageProps = {
  errorMessage: string;
  hideImage?: boolean;
};

const ErrorPage = ({ errorMessage, hideImage }: ErrorPageProps) => {
  return (
    <div className={styles.errorPageWrapper}>
      <Container>
        {!hideImage && (
          <div className={styles.errorPageImage}>
            <Image src="/images/404.png" width={902} height={570} alt="404" />
          </div>
        )}
        <h1>{errorMessage}</h1>
      </Container>
    </div>
  );
};

export default ErrorPage;
