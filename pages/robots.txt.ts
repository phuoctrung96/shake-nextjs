import { NextPageContext } from 'next';

const Robots = () => null;

export const getServerSideProps = async ({ res }: NextPageContext) => {
  const renderRobots = () => {
    return process.env.NEXT_PUBLIC_ENV === 'production'
      ? `User-Agent: *
Allow: /

Sitemap: ${process.env.NEXT_PUBLIC_FETCH_URL}sitemap.xml
Sitemap: ${process.env.NEXT_PUBLIC_FETCH_URL}sitemap-reviews.xml`
      : `User-Agent: *
Disallow: /

Sitemap: ${process.env.NEXT_PUBLIC_FETCH_URL}sitemap.xml`;
  };

  if (res) {
    res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
    res.write(renderRobots());
    res.end();
  }
  return {
    props: {},
  };
};

export default Robots;
