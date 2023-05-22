import React from 'react';
import styles from './profileWithIcon.module.scss';
import { shortenNumber } from '../../../utils/utils';
import ProfileIcon from '../profile-icon/ProfileIcon';
import { SingleProfilesSectionType } from '../../../types/profiles';

const ProfileWithIcon = ({ title, countOfProfiles }: SingleProfilesSectionType) => {
  return (
    <div className={styles.profileWithIconWrapper}>
      <ProfileIcon name={title} className={styles.icon} />
      <h3>{title}</h3>
      <p>
        {shortenNumber(countOfProfiles, 1000)} {countOfProfiles === 1 ? 'Profile' : 'Profiles'}
      </p>
    </div>
  );
};

export default ProfileWithIcon;
