import React from 'react';
import styles from './partners.module.scss';
import Image from 'next/image';
import Container from '../container/Container';

const PARTNER_IMAGES = [
  { filename: 'samsung.svg', width: 117, height: 44, alt: 'Samsung' },
  { filename: 'pwc.svg', width: 117, height: 44, alt: 'PWC' },
  { filename: 'brandwatch.svg', width: 117, height: 44, alt: 'BrandWatch' },
  { filename: 'broadly.svg', width: 117, height: 44, alt: 'Broadly' },
  { filename: 'signpost.png', width: 117, height: 44, alt: 'signpost' },
];

type PartnersProps = {
  className?: string;
};

const Partners = ({ className = '' }: PartnersProps) => {
  return (
    <div className={styles.partnersWrapper}>
      <Container className={className}>
        <div className={`${styles.logoContainer}`}>
          {PARTNER_IMAGES.map(({ filename, width, height, alt }, index) => (
            <div
              key={index}
              className={styles.logo}
              data-aos="fade-up"
              data-aos-offset="100"
              data-aos-delay={index + 1 + '00'}
              data-aos-duration="1000"
            >
              <Image src={`/images/partners/${filename}`} width={width} height={height} alt={alt} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Partners;
