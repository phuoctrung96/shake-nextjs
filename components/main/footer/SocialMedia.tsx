import React from 'react';
import Icon from '../../reusable/icon/Icon';
import { iconTypes } from '../../reusable/icon/iconTypes';
import styles from './socialMedia.module.css';
import Link from 'next/link';

type SocialMediaType = {
  link: string;
  iconName: iconTypes;
};

const SOCIAL_MEDIA_LINKS: SocialMediaType[] = [
  {
    link: 'https://www.linkedin.com/company/shakeio',
    iconName: 'LinkedIn',
  },
  {
    link: 'https://www.instagram.com/shake.engineering',
    iconName: 'Instagram',
  },
  {
    link: 'https://twitter.com/Shake_IO',
    iconName: 'Twitter',
  },
  {
    link: 'https://www.facebook.com/shakeventures',
    iconName: 'FacebookAlt',
  },
];

type SocialMediaProps = {
  className?: string;
};

const SocialMedia = ({ className = '' }: SocialMediaProps) => {
  return (
    <div className={`${styles.socialMedia} ${className}`}>
      <ul>
        {SOCIAL_MEDIA_LINKS.map(({ link, iconName }, index) => (
          <li key={index}>
            <Link
              href={link}
              passHref
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open our ${iconName} page on a new tab`}
            >
              <Icon name={iconName} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialMedia;
