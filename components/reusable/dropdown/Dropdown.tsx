import React, { KeyboardEvent, useState } from 'react';
import styles from './dropdown.module.scss';
import BaseButton from '../base-button/BaseButton';
import Icon from '../icon/Icon';
import DropdownContent from './DropdownContent';
import { DropdownItemsType } from '../../main/header/Header';

type DropdownProps = {
  dropdownTitle: string;
  items: DropdownItemsType[];
  handleMenuClose?: () => void;
  bottomMenu?: DropdownItemsType[] | null;
  className?: string;
};

const Dropdown = ({
  dropdownTitle,
  items,
  handleMenuClose = () => {},
  bottomMenu,
  className = '',
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuDropdownClose = () => {
    setIsOpen(false);
    handleMenuClose();
  };

  const handleDropdownToggle = (e: KeyboardEvent) => {
    e.preventDefault();
    setIsOpen((isOpen) => !isOpen);
  };

  const handleDropdownClickToggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <div className={`${styles.dropdownWrapper} ${className}`} onMouseLeave={() => setIsOpen(false)}>
      <BaseButton
        viewType="menu"
        onClick={handleDropdownClickToggle}
        onKeyPress={(e) => handleDropdownToggle(e)}
        className={styles.dropdownTriggerBtn}
      >
        {dropdownTitle}
        <span>
          <Icon
            name="ArrowDown"
            className={`${styles.arrow} ${isOpen ? styles.arrowMenuOpen : ''}`}
          />
        </span>
      </BaseButton>
      <div className={`${styles.dropdownMenu} ${isOpen ? 'visible' : ''}`} role="menu">
        <ul>
          {items.map((item) => (
            <li key={item.id} className={styles.dropdownItem}>
              <DropdownContent handleClick={handleMenuDropdownClose} {...item} />
            </li>
          ))}
        </ul>
        {bottomMenu && (
          <div className={styles.bottomMenu}>
            {bottomMenu.map((item) => (
              <DropdownContent key={item.id} handleClick={handleMenuDropdownClose} {...item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
