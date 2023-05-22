import React from 'react';
import MainHeroSection from './MainHeroSection';
import Partners from '../../reusable/partners/Partners';
import MainContent from './MainContent';
import ReviewsSection from './ReviewsSection';

const HomePageDefaultGlobe = () => {
  return (
    <div>
      <MainHeroSection />
      <Partners />
      <MainContent />
      <ReviewsSection />
    </div>
  );
};

export default HomePageDefaultGlobe;
