import React from 'react';
import styles from './logo.module.css';
import Image from 'next/image';
import Link from 'next/link';

type LogoProps = {
  version?: 'light' | 'dark';
  handleClick?: () => void;
  className?: string;
};

const Logo = ({ version = 'light', handleClick, className = '' }: LogoProps) => {
  return (
    <Link href="/" passHref className={`${styles.logo} ${className}`} onClick={handleClick}>
      <div className={styles.logoWrapper}>
        <Image
          src={`/images/${version === 'light' ? 'shake-logo-light.svg' : 'shake-logo.svg'}`}
          width={82}
          height={34}
          alt="Shake logo"
        />
      </div>
    </Link>
  );
};

export default Logo;
