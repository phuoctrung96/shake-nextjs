import React from 'react';
import styles from './team.module.scss';
import SectionTitle from '../../reusable/section-title/SectionTitle';
import Container from '../../reusable/container/Container';
import MemberCard from '../../reusable/member-card/MemberCard';
import Image from 'next/image';
import BaseLink from '../../reusable/base-link/BaseLink';
import Tooltip from '../../reusable/tooltip/Tooltip';

export type TeamMember = {
  fullname: string;
  position: string;
  location: string;
  imageFilename: string;
  imageWidth: number;
  imageHeight: number;
};

const TEAM_MEMBERS: TeamMember[] = [
  {
    fullname: 'Philip Kallberg',
    position: 'CEO',
    location: 'Lisbon, Portugal',
    imageFilename: 'Philip.jpg',
    imageWidth: 512,
    imageHeight: 512,
  },
  {
    fullname: 'Horatiu Mocian',
    position: 'Head of Product',
    location: 'Targu Mures, Romania',
    imageFilename: 'Horatiu.jpg',
    imageWidth: 512,
    imageHeight: 512,
  },
  {
    fullname: 'Natalia Gavrilova',
    position: 'Head of Engineering',
    location: 'Helsinki, Finland',
    imageFilename: 'Natalia Gavrilova.jpg',
    imageWidth: 512,
    imageHeight: 512,
  },
  {
    fullname: 'Shakira Williams',
    position: 'Chief of Staff',
    location: 'Cape Town, South Africa',
    imageFilename: 'Shakira.jpg',
    imageWidth: 512,
    imageHeight: 485,
  },
  {
    fullname: 'Daniel Campbell',
    position: 'Chief Commercial Officer',
    location: 'Brighton, UK',
    imageFilename: 'Daniel.jpg',
    imageWidth: 512,
    imageHeight: 512,
  },
  {
    fullname: 'Mary Joy Sayson',
    position: 'Customer Service Manager',
    location: 'Manila, Philippines',
    imageFilename: 'MJ.jpg',
    imageWidth: 512,
    imageHeight: 512,
  },
];

const MORE_MEMBERS = [
  {
    imageFilename: 'Renny.png',
  },
  {
    imageFilename: 'Laura.jpg',
  },
  {
    imageFilename: 'Philemon.jpg',
  },
  {
    imageFilename: 'Bohdan.jpg',
  },
];

const Team = () => {
  return (
    <section className={styles.team}>
      <div className={styles.worldBg}>
        <div>
          <Image
            src="/images/team/world.png"
            objectFit="contain"
            objectPosition="top"
            alt=""
            width={1418}
            height={716}
          />
        </div>
      </div>
      <Container>
        <div className="row justify-content-center ">
          <SectionTitle
            title="Our Team"
            className={styles.title}
            aosAnimation="zoom-in"
            aosDelay={100}
          >
            Diversity is life at Shake, not just a corporate slogan. We have colleagues on 4
            continents and are always looking for talented people to join the team.
          </SectionTitle>
          {TEAM_MEMBERS.map((member, index) => (
            <div
              key={member.fullname}
              className="col-md-6 col-lg-4 z-2"
              data-aos="fade-up"
              data-aos-offset="100"
              data-aos-duration="1000"
              data-aos-delay={(index + 1) % 3 === 0 ? '300' : ((index + 1) % 3) + '00'}
            >
              <MemberCard {...member} />
            </div>
          ))}
          <div
            className={`${styles.moreWrap} col-12 d-flex align-items-center justify-content-center flex-wrap`}
            data-aos="zoom-in"
            data-aos-duration="800"
          >
            <ul className={styles.more}>
              {MORE_MEMBERS.map((member) => (
                <li key={member.imageFilename} className={styles.moreItem}>
                  <Image
                    src={`/images/team/${member.imageFilename}`}
                    alt=""
                    width={38}
                    height={38}
                  />
                </li>
              ))}
            </ul>
            <h3 className={styles.moreTitle}>20+ other colleagues around the world</h3>
          </div>
          <div className={styles.cta} data-aos="zoom-in" data-aos-duration="800">
            <Tooltip text="We are hiring">
              <BaseLink
                href="https://shake.factorialhr.com/#jobs/"
                title="Join Our Team"
                external
                viewType="primary"
              />
            </Tooltip>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Team;
