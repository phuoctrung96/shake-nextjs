import React from 'react';
import Image from 'next/image';
import styles from './service.module.css';
import BaseLink from '../base-link/BaseLink';

type ServiceProps = {
  image: {
    url: string;
    width: number;
    height: number;
    alt?: string;
  };
  description: string;
  link: string;
  buttonText: string;
};

const Service = ({ image, description, link, buttonText }: ServiceProps) => {
  return (
    <div className={styles.service}>
      <div className={styles.logo}>
        <Image
          src={image.url}
          alt={image.alt || 'Service logo'}
          width={image.width}
          height={image.height}
        />
      </div>
      <p>{description}</p>
      <BaseLink href={link} external title={buttonText} viewType="primary" />
    </div>
  );
};

export default Service;
