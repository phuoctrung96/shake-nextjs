import React, { useEffect, useRef, useState } from 'react';
import styles from './profilesSection.module.scss';
import BaseButton from '../base-button/BaseButton';
import ProfileWithIcon from '../profile-with-icon/ProfileWithIcon';
import Icon from '../icon/Icon';
import {
  ProfileServices,
  ProfilesSummaryType,
  ProfileType,
  SingleProfileType,
} from '../../../types/profiles';
import ProfileIcon from '../profile-icon/ProfileIcon';
import Link from 'next/link';
import AnimateHeight, { Height } from 'react-animate-height';
import { shortenNumber } from '../../../utils/utils';
import { useRouter } from 'next/router';

type ProfilesSectionType = {
  companyName?: string;
  perSourceSummary?: ProfilesSummaryType;
  profiles: ProfileType[];
};
const ProfilesSection = ({ companyName, perSourceSummary, profiles }: ProfilesSectionType) => {
  const [height, setHeight] = useState<Height>(0);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dropdownTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const listener = (event: any) => {
      if (
        !dropdownRef.current ||
        !dropdownTriggerRef.current ||
        dropdownRef.current.contains(event.target) ||
        dropdownTriggerRef.current.contains(event.target)
      ) {
        return;
      }

      setHeight(0);
    };

    document.addEventListener('mouseup', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mouseup', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [dropdownRef]);

  let perSourceSummaryArray = [];

  if (!perSourceSummary) return null;

  for (const [key, value] of Object.entries(perSourceSummary.per_source)) {
    perSourceSummaryArray.push({ review_site: value.source, total: value.profiles });
  }

  const topProfiles = perSourceSummaryArray.slice(0, 6);

  let profilesByLocation = new Map<ProfileServices | string, SingleProfileType[]>([]);

  const getProfilesByLocation = () => {
    for (const profile of profiles) {
      if (profile.type !== 'location') continue;

      if (typeof profile.location === 'undefined') continue;

      profilesByLocation.set(profile.location.address, profile.profiles);
    }
  };
  getProfilesByLocation();

  let profilesByService = new Map<ProfileServices, SingleProfileType[]>([]);

  const getProfilesByService = () => {
    for (const profile of profiles) {
      if (profile.type === 'location') continue;

      profile.profiles.map((singleProfile) => {
        const existingProfiles =
          profilesByService.get(singleProfile.source as ProfileServices) || [];

        profilesByService.set(singleProfile.source as ProfileServices, [
          ...existingProfiles,
          singleProfile,
        ]);
      });
    }
  };
  getProfilesByService();

  const locationProfilesCount = perSourceSummary.per_type.filter(
    (item) => item.type === 'location'
  )[0]?.profiles;

  const renderProfiles = () => {
    let dropdownSections = [];
    let countOfProfiles = 0;

    for (const [key, value] of profilesByLocation) {
      if (countOfProfiles > 9) break;
      if (value.length === 0) continue;

      dropdownSections.push(
        <div className={styles.dropdownSection} key={key}>
          <div className={styles.dropdownHeader}>
            <Icon name="MapPin" className={styles.mapPin} />
            <p className={styles.title}>
              {key}{' '}
              <span className={styles.countOfProfiles}>
                {value.length} {value.length === 1 ? 'Profile' : 'Profiles'}
              </span>
            </p>
          </div>
          {value.map((item, index) => {
            if (countOfProfiles > 9) return;

            countOfProfiles++;
            return (
              <div key={index} className={styles.profileLinkWrapper}>
                <Link href={item.url || ''} passHref target="_blank" rel="noopener noreferrer">
                  <ProfileIcon name={item.source} className={styles.urlProfileIcon} />
                  <span>{item.url}</span>
                  <Icon name="NewTab" />
                </Link>
              </div>
            );
          })}
        </div>
      );
    }

    for (const [key, value] of profilesByService) {
      if (countOfProfiles > 9) break;
      dropdownSections.push(
        <div className={styles.dropdownSection} key={key}>
          <div className={styles.dropdownHeader}>
            <ProfileIcon name={key} className={styles.icon} />
            <p className={styles.title}>
              {key}{' '}
              <span className={styles.countOfProfiles}>
                {value.length} {value.length === 1 ? 'Profile' : 'Profiles'}
              </span>
            </p>
          </div>
          {value.map((item, index) => {
            if (countOfProfiles > 9) return;
            countOfProfiles++;
            return (
              <div key={index} className={styles.profileLinkWrapper}>
                <Link href={item.url || ''} passHref target="_blank" rel="noopener noreferrer">
                  <span className={styles.noIcon}>{item.url}</span>
                  <Icon name="NewTab" />
                </Link>
              </div>
            );
          })}
        </div>
      );
    }

    return dropdownSections;
  };
  return (
    <div className={styles.profilesWrapper}>
      <div className={styles.topProfilesWrapper}>
        {topProfiles.map(({ review_site, total }, index) => (
          <ProfileWithIcon
            key={index}
            title={review_site as ProfileServices}
            countOfProfiles={total}
          />
        ))}
      </div>
      <div className={styles.rightSection}>
        {perSourceSummaryArray.length > 6 && (
          <p className={styles.moreSites}>and {perSourceSummaryArray.length - 6} more sites...</p>
        )}
        <div className={styles.dropdownWrapper}>
          <BaseButton
            viewType="secondary"
            className={styles.seeProfileBtn}
            ref={dropdownTriggerRef}
            onClick={() => {
              setHeight((oldHeight) => {
                return oldHeight === 0 ? 'auto' : 0;
              });
            }}
          >
            See {topProfiles.length === 1 ? 'profile' : 'profiles'}{' '}
            <Icon name="RightArrow" className={styles.downArrow} />
          </BaseButton>
          <AnimateHeight duration={350} height={height} className={styles.animatedHeightWrapper}>
            <div ref={dropdownRef} className={styles.dropdown}>
              {renderProfiles()}
              <div className={styles.dropdownFooter}>
                {locationProfilesCount > 10 && (
                  <p>
                    and{' '}
                    <span>{shortenNumber(locationProfilesCount - 10, 1000)} more locations</span>
                  </p>
                )}
                <Link
                  href={`/contact-us?referUrl=${encodeURIComponent(
                    process.env.NEXT_PUBLIC_FETCH_URL?.slice(0, -1) + router.asPath
                  )}&reportCompany=${encodeURIComponent(companyName || '')}`}
                  passHref
                  rel="nofollow"
                >
                  <span>
                    <Icon name="Alert" />{' '}
                  </span>
                  Report an issue
                </Link>
              </div>
            </div>
          </AnimateHeight>
        </div>
      </div>
    </div>
  );
};

export default ProfilesSection;
