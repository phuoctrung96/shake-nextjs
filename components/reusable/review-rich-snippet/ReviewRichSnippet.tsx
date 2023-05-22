import Head from 'next/head';
import React from 'react';

type ReviewRichSnippetType = {
  name: string;
  ratingValue: number;
  ratingCount: number;
};

const ReviewRichSnippet = ({ name, ratingValue, ratingCount }: ReviewRichSnippetType) => {
  return (
    <Head>
      <script
        type="application/ld+json"
        key="review-rich-snippet"
        dangerouslySetInnerHTML={{
          __html: `{
    "@context": "https://schema.org/",
    "@type": "AggregateRating",
    "itemReviewed": {
        "@type": "LocalBusiness",
        "name": "${name}"
    },
    "ratingValue": "${ratingValue}",
    "ratingCount": "${ratingCount}"
}`,
        }}
      ></script>
    </Head>
  );
};

export default ReviewRichSnippet;
