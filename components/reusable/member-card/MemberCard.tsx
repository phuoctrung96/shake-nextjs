import React from 'react';
import styles from './memberCard.module.scss';
import Image from 'next/image';
import { TeamMember } from '../../route/about-page/Team';

const MemberCard = ({
  fullname,
  position,
  location,
  imageFilename,
  imageWidth,
  imageHeight,
}: TeamMember) => {
  return (
    <div className={styles.cardWrap}>
      <div className={styles.card}>
        <div className={styles.image}>
          <div>
            <Image
              src={`/images/team/${imageFilename}`}
              alt={fullname}
              width={imageWidth}
              height={imageHeight}
            />
          </div>
        </div>
        <div className={`${styles.body} d-flex align-items-center justify-content-between`}>
          <div className={styles.info}>
            <h3 className={styles.name}> {fullname}</h3>
            <h4 className={styles.position}>{position}</h4>
          </div>
          <div className={`${styles.location} c-card__location d-flex align-items-center`}>
            <span className={styles.icon}>
              <Image src="/images/team/location.svg" alt="" width={14} height={14} />
            </span>
            {location}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
