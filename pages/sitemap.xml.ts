import { NextPageContext } from 'next';

const Sitemap = () => null;

export const getServerSideProps = async ({ res }: NextPageContext) => {
  const date = new Date().toISOString();

  // static pages
  const staticPages = [{ slug: '' }, { slug: 'about' }, { slug: 'contact-us' }];

  if (res) {
    res.setHeader('Content-Type', 'text/xml');
    res.write(`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${staticPages.map((page) => {
          return `<url>
<loc>${process.env.NEXT_PUBLIC_FETCH_URL}${page.slug}</loc>
<lastmod>${date}</lastmod>
</url>`;
        })}
    </urlset>`);
    res.end();
  }
  return {
    props: {},
  };
};

export default Sitemap;
