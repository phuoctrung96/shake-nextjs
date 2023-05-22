import React from 'react';
import styles from './signUpSection.module.scss';
import BaseButton from '../base-button/BaseButton';
import Container from '../container/Container';
import Title from '../title/Title';
import useSignUpModal from '../../hooks/useSignUpModal';

const SignUpSection = () => {
  const { openModal } = useSignUpModal();

  return (
    <div className={styles.signUpSectionWrapper}>
      <Container>
        <div>
          <Title as="h2" className={styles.title}>
            Sign Up
          </Title>
          <p className={styles.description}>
            Start unleashing growth with online reviews!
          </p>
        </div>
        <BaseButton className={styles.signUpBtn} handleClick={openModal}>
          Sign Up for Free
        </BaseButton>
      </Container>
    </div>
  );
};

export default SignUpSection;
