import type { NextPage } from 'next';
import SeoTags from '../components/reusable/seo-tags/SeoTags';
import HomePage from '../components/route/home-page/HomePage';

const Home: NextPage = () => {
  return (
    <>
      <SeoTags
        metaTitle="Analyze any company with online reviews | Shake"
        metaDescription="We help businesses supercharge their growth with online reviews, using both 1st party reviews on their business and 3rd party reviews on other businesses."
      />
      <HomePage />
    </>
  );
};

export default Home;
