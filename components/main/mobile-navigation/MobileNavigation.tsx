import React from 'react';
import styles from './mobileNavigation.module.scss';
import Image from 'next/image';
import ActionButton from '../../reusable/action-button/ActionButton';
import BaseLink from '../../reusable/base-link/BaseLink';
import Logo from '../../reusable/logo/Logo';

import BaseButton from '../../reusable/base-button/BaseButton';
import useSignUpModal from '../../hooks/useSignUpModal';
import { MenuItemsType } from '../header/Header';
import Dropdown from '../../reusable/dropdown/Dropdown';

type MobileNavigationProps = {
  isOpened: boolean;
  handleMenuClose: () => void;
} & { links: MenuItemsType };

const MobileNavigation = ({ links, isOpened, handleMenuClose }: MobileNavigationProps) => {
  const { openModal } = useSignUpModal();

  return (
    <div className={`${styles.mobileNavWrapper} ${isOpened ? styles.open : styles.close}`}>
      <div className={styles.logoWrapper}>
        <Logo className={styles.logo} handleClick={handleMenuClose} version="dark" />
        <ActionButton handleClick={handleMenuClose} ariaLabel="Close menu">
          <Image src="/images/close.svg" width={20} height={21} alt="Close menu" />
        </ActionButton>
      </div>
      <nav className={`${styles.navigation}`}>
        <ul>
          {links.map(({ dropdown, title, href, external }, index) => {
            if (typeof dropdown !== 'undefined') {
              return (
                <li key={index}>
                  <Dropdown
                    dropdownTitle={title}
                    items={dropdown}
                    key={index}
                    handleMenuClose={handleMenuClose}
                  />
                </li>
              );
            }

            return (
              <li key={index}>
                <BaseLink
                  title={title || ''}
                  href={href || ''}
                  external={external}
                  viewType="menu"
                  handleClick={handleMenuClose}
                />
              </li>
            );
          })}
        </ul>
        <BaseButton
          viewType="primary"
          handleClick={() => {
            handleMenuClose();
            openModal();
          }}
          className={styles.signUpBtn}
        >
          Sign Up
        </BaseButton>
      </nav>
    </div>
  );
};

export default MobileNavigation;
