import React, { AnchorHTMLAttributes } from 'react';
import styles from './baseLink.module.scss';
import Link, { LinkProps } from 'next/link';

export type BaseLinkProps = {
  title: string;
  href: string;
  handleClick?: () => void;
  external?: boolean;
  viewType?: 'primary' | 'secondary' | 'menu';
  className?: string;
};

const BaseLink = ({
  title,
  href,
  handleClick,
  className = '',
  external = false,
  viewType = 'primary',
}: BaseLinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <Link
      href={href}
      className={`${styles.link} ${styles[viewType]} ${className}`}
      onClick={handleClick}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {title}
    </Link>
  );
};

export default BaseLink;
