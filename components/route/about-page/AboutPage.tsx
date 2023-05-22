import React from 'react';
import styles from './aboutPage.module.css';
import AboutHero from './AboutHero';
import Partners from '../../reusable/partners/Partners';
import Team from './Team';
import OurValues from './OurValues';
import Results from './results';
import MeetShake from './MeetShake';

const AboutPage = () => {
  return (
    <>
      <AboutHero />
      <Partners />
      <Results />
      <MeetShake />
      <Team />
      <OurValues />
    </>
  );
};

export default AboutPage;
