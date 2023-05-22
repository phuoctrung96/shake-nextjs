import { useRouter } from 'next/router';
import React from 'react';
import BaseLink from '../base-link/BaseLink';
import styles from './blurredSection.module.scss';

type BlurredSectionProps = {
  active: boolean;
  blurValue?: number;
  linkText?: string;
};

const BlurredSection = ({
  active,
  blurValue = 3,
  linkText = 'Gain deeper insights',
}: BlurredSectionProps) => {
  const router = useRouter();

  return active ? (
    <div className={`${styles.blurLinkWrapper} ${styles[`blur${blurValue}`]}`}>
      <BaseLink
        href={`/contact-us?referUrl=${encodeURIComponent(
          process.env.NEXT_PUBLIC_FETCH_URL?.slice(0, -1) + router.asPath
        )}`}
        title={linkText}
        className={styles.blurLink}
        rel="nofollow"
      />
    </div>
  ) : null;
};

export default BlurredSection;
