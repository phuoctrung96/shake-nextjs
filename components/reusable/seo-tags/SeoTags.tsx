import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

type SeoTagsProps = {
  metaTitle: string;
  metaDescription?: string;
  metaImage?: string;
};

const SeoTags = ({
  metaTitle,
  metaDescription,
  metaImage = `${process.env.NEXT_PUBLIC_FETCH_URL}images/shake-og.png`,
}: SeoTagsProps) => {
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_FETCH_URL?.slice(0, -1) + router.asPath;

  return (
    <Head>
      <title>{metaTitle}</title>
      {metaDescription && <meta name="description" content={metaDescription} />}
      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={metaTitle} />
      <meta name="twitter:card" content="summary_large_image" />
      {metaDescription && <meta property="og:description" content={metaDescription} />}
      {metaImage && !router.asPath.startsWith('/reviews/') && (
        <meta property="og:image" content={metaImage} />
      )}
      <meta property="og:site_name" content="Shake.io" />
    </Head>
  );
};

export default SeoTags;
