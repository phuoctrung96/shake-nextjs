import React from 'react';
import Link from 'next/link';
import styles from './dropdown.module.scss';
import Icon from '../icon/Icon';
import { DropdownItemsType } from '../../main/header/Header';

type DropdownContentProps = DropdownItemsType & { handleClick: () => void };

const DropdownContent = ({
  link,
  external,
  name,
  description,
  icon,
  handleClick,
}: DropdownContentProps) => {
  return (
    <div className={styles.dropdownContentWrapper}>
      {icon && <Icon name={icon} className={styles.icon} />}
      <div className={styles.dropdownContent}>
        <Link
          href={link}
          passHref
          className={styles.dropdownLink}
          onClick={handleClick}
          onKeyPress={handleClick}
          {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
        >
          <p>
            {name} {<Icon name="ArrowThick" className={styles.hoverIcon} />}
          </p>
          <p>
            {description}
            {description === 'Changelog' && <span className="whats-new"></span>}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default DropdownContent;
