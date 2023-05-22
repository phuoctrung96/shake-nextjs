import React, { useState } from 'react';
import styles from './header.module.scss';
import Image from 'next/image';
import Container from '../../reusable/container/Container';
import Logo from '../../reusable/logo/Logo';
import Navigation from '../navigation/Navigation';
import MobileNavigation from '../mobile-navigation/MobileNavigation';
import ActionButton from '../../reusable/action-button/ActionButton';
import { iconTypes } from '../../reusable/icon/iconTypes';

export type DropdownItemsType = {
  id: number;
  name: string;
  description: string;
  link: string;
  icon?: iconTypes;
  external?: boolean;
};

const DROPDOWN_ITEMS: DropdownItemsType[] = [
  {
    id: 1,
    name: 'Reviewshake',
    description: 'Generate, manage, market and analyze online reviews on 85+ review sites.',
    link: 'https://www.reviewshake.com',
    external: true,
  },
  {
    id: 2,
    name: 'Datashake',
    description: 'Aggregate standardized data from 85+ review sites with our purpose-built APIs.',
    link: 'https://datashake.com',
    external: true,
  },
];

export type MenuItemsType = (
  | {
      title: string;
      dropdown: DropdownItemsType[];
      href?: never;
      external?: never;
    }
  | {
      title: string;
      href: string;
      external?: boolean;
      dropdown?: never;
    }
)[];

const NAV_LINKS: MenuItemsType = [
  {
    title: 'Solutions',
    dropdown: DROPDOWN_ITEMS,
  },
  {
    title: 'About Us',
    href: '/about',
  },
  {
    title: 'Careers',
    href: 'https://shake.factorialhr.com/',
    external: true,
  },
  {
    title: 'Contact Us',
    href: '/contact-us',
  },
];

type HeaderProps = {
  viewType: 'normal' | 'dark';
};

const Header = ({ viewType }: HeaderProps) => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  const handleOpen = () => {
    setIsNavigationOpen(true);
  };

  const handleClose = () => {
    setIsNavigationOpen(false);
  };

  return (
    <header className={`${styles.header} ${viewType === 'dark' && styles.dark}`}>
      <Container>
        <div>
          <Logo className={styles.logo} />
          <p className={styles.beta}>Beta</p>
        </div>
        <ActionButton
          handleClick={handleOpen}
          aria-label="Open Navigation Menu"
          className={styles.openMenuButton}
        >
          <Image src="/images/menu.svg" width={20} height={21} alt="Open menu" />
        </ActionButton>
        <Navigation links={NAV_LINKS} />
        <MobileNavigation
          links={NAV_LINKS}
          isOpened={isNavigationOpen}
          handleMenuClose={handleClose}
        />
      </Container>
    </header>
  );
};

export default Header;
