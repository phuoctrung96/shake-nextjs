import React from 'react';
import { NextPage } from 'next';
import AboutPage from '../components/route/about-page/AboutPage';
import SeoTags from '../components/reusable/seo-tags/SeoTags';

const About: NextPage = () => {
  return (
    <>
      <SeoTags
        metaTitle="About | Shake"
        metaDescription="Our mission is to help businesses grow with online reviews, using both 1st party reviews on your business and 3rd party reviews on other businesses."
      />
      <AboutPage />
    </>
  );
};

export default About;
