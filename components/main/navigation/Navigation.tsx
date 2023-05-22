import React from 'react';
import styles from './navigation.module.scss';
import BaseLink, { BaseLinkProps } from '../../reusable/base-link/BaseLink';
import useSignUpModal from '../../hooks/useSignUpModal';
import BaseButton from '../../reusable/base-button/BaseButton';
import { MenuItemsType } from '../header/Header';
import Dropdown from '../../reusable/dropdown/Dropdown';

const Navigation = ({ links }: { links: MenuItemsType }) => {
  const { openModal } = useSignUpModal();

  return (
    <nav className={styles.navigation}>
      <ul>
        {links.map(({ title, dropdown, href, external }, index) => {
          return dropdown ? (
            <li key={index}>
              <Dropdown dropdownTitle={title} items={dropdown} key={index} />
            </li>
          ) : (
            <li key={index}>
              <BaseLink
                title={title || ''}
                href={href || ''}
                external={external}
                viewType="menu"
                className={styles.link}
              />
            </li>
          );
        })}
      </ul>
      <BaseButton viewType="primary" handleClick={openModal} className={styles.signUpBtn}>
        Sign Up
      </BaseButton>
    </nav>
  );
};

export default Navigation;
