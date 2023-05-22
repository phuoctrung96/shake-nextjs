import React, { useState } from 'react';
import styles from './signUpModal.module.scss';
import Modal from '../modal/Modal';
import Link from 'next/link';
import BaseButton from '../base-button/BaseButton';
import Image from 'next/image';
import Icon from '../icon/Icon';
import ProgressBar from '../progress-bar/ProgressBar';
import BaseLink from '../base-link/BaseLink';
import useSignUpModal from '../../hooks/useSignUpModal';

const SURVEY_DATA = [
  {
    question: 'What are you trying to achieve?',
    answers: [
      { id: 0, text: 'Manage reviews for my business' },
      { id: 1, text: 'Generate more reviews for my business' },
      { id: 2, text: 'Analyze online reviews' },
      { id: 3, text: 'Leverage reviews in my marketing efforts' },
    ],
  },
  {
    question: 'What is your preferred method of doing this?',
    answers: [
      { id: 0, text: 'With a dashboard' },
      { id: 1, text: 'In my own system' },
    ],
  },
  {
    question: 'Do you have technical (eg. engineering) resources?',
    answers: [
      { id: 0, text: 'Yes' },
      { id: 1, text: 'No' },
    ],
  },
];

const showProgressOnSteps = [1, 2, 3];

type SignUpModalType = {
  className?: string;
};

const SignUpModal = ({ className = '' }: SignUpModalType) => {
  const { isOpen, closeModal } = useSignUpModal();
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswer] = useState<{ 0: number | null; 1: number | null; 2: number | null }>({
    0: null,
    1: null,
    2: null,
  });

  const nextStep = () => {
    setActiveStep((prevState) => prevState + 1);
  };

  const renderDatashakeResult = () => (
    <>
      <div className={styles.imageWr}>
        <Image src="/images/datashake.svg" width={176} height={46} alt="Datashake" />
      </div>
      <h2>Datashake is best for you - sign up now</h2>
      <div className={styles.linksWr}>
        <BaseLink href="https://app.datashake.com/signup" external title="Sign up for Datashake" />
        <BaseLink href="/contact-us" title="Contact Sales" viewType="secondary" />
      </div>
    </>
  );

  const renderReviewshakeResult = () => (
    <>
      <div className={styles.imageWr}>
        <Image src="/images/reviewshake.svg" width={176} height={46} alt="Datashake" />
      </div>
      <h2>Reviewshake is best for you - sign up now</h2>
      <div className={styles.linksWr}>
        <BaseLink
          href="https://app.reviewshake.com/auth/signup"
          external
          title="Sign up for Reviewshake"
        />
        <BaseLink href="/contact-us" title="Contact Sales" viewType="secondary" />
      </div>
    </>
  );

  const renderResult = () => {
    if (answers[2] === 1) {
      return renderReviewshakeResult();
    } else if (answers[2] === 0 && answers[1] === 0) {
      return renderReviewshakeResult();
    } else if (answers[2] === 0 && answers[1] === 1 && (answers[0] === 1 || answers[0] === 3)) {
      return renderReviewshakeResult();
    }

    return renderDatashakeResult();
  };

  return (
    <Modal show={isOpen} onClose={closeModal} className={`${styles.modal} ${className}`}>
      {showProgressOnSteps.includes(activeStep) && (
        <div className={styles.progressBarWr}>
          <ProgressBar progress={Math.ceil((100 / 3) * activeStep)} totalNumber={100} />
          <p>
            <span>{activeStep}</span> / 3
          </p>
        </div>
      )}
      <div className={`${styles.step} ${styles.firstStep} ${activeStep === 0 && styles.active}`}>
        <h2>Sign up for</h2>
        <div className={styles.signUpLinks}>
          <Link
            href="https://app.datashake.com/signup"
            passHref
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.imageWr}>
              <Image src="/images/datashake.svg" width={176} height={46} alt="Datashake" />
            </div>
          </Link>
          <Link
            href="https://app.reviewshake.com/auth/signup"
            passHref
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.imageWr}>
              <Image src="/images/reviewshake.svg" width={185} height={41} alt="Reviewshake" />
            </div>
          </Link>
        </div>
        <button className={styles.helpYouFormBtn} onClick={nextStep}>
          Not sure?<span> Let us help you!</span>
        </button>
      </div>
      {SURVEY_DATA.map((step, firstIndex) => (
        <div
          key={firstIndex}
          className={`${styles.step} ${activeStep === firstIndex + 1 ? styles.active : ''}`}
        >
          <h2>{step.question}</h2>
          <ol>
            {step.answers.map((answer, index) => {
              return (
                <li
                  key={index}
                  className={answers[firstIndex as 0 | 1 | 2] === index ? styles.selected : ''}
                >
                  <button
                    onClick={() => {
                      setAnswer((prevState) => ({
                        ...prevState,
                        [firstIndex as 0 | 1 | 2]: index,
                      }));
                    }}
                  >
                    <span>{index + 1}.</span> {answer.text}
                  </button>
                </li>
              );
            })}
          </ol>
          <BaseButton
            handleClick={nextStep}
            className={styles.continueBtn}
            disabled={answers[firstIndex as 0 | 1 | 2] === null ? true : false}
          >
            Continue <Icon name="RightArrow" />
          </BaseButton>
        </div>
      ))}
      <div className={`${styles.step} ${styles.results} ${activeStep === 4 ? styles.active : ''}`}>
        {renderResult()}
      </div>
    </Modal>
  );
};

export default SignUpModal;
