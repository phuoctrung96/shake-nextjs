import Head from 'next/head';
import React from 'react';
import useCompanies from '../../../providers/CompaniesProvider';

const DynamicOgImage = () => {
  const { summariesData, companyNames } = useCompanies();

  const companyWebsites = summariesData.map((summary) => summary.organization.website || '');

  const metaImage = new URL(`${process.env.NEXT_PUBLIC_OG_IMAGE_FETCH_URL}api/image`);
  companyWebsites.map((website) => metaImage.searchParams.append('companyWebsites', website));
  companyNames.map((companyName) => metaImage.searchParams.append('companyNames', companyName));

  return (
    <Head>
      <meta property="og:image" content={metaImage.toString()} />
    </Head>
  );
};

export default DynamicOgImage;
