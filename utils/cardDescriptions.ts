import { RatingType } from '../components/reusable/profile-page-charts/ProfilePageCharts';
import { ReviewsResType, SummaryResType } from '../types/companies';
import {
  capitalizeFirstLetter,
  formatNumber,
  getPercentageDecrease,
  getPercentageIncrease,
} from './utils';

export const getAverageRatingSectionDescription = (
  lowestRatings: RatingType,
  highestRatings: RatingType,
  summariesData: SummaryResType[]
) => {
  if (lowestRatings.size === 0 || highestRatings.size === 0) return '';

  if (summariesData.length === 3) {
    return getThreeCompaniesAverageRatingDescription(summariesData);
  } else if (summariesData.length === 2) {
    return getTwoCompaniesAverageRatingDescription(summariesData);
  } else if (summariesData.length === 1) {
    return getSingleCompanyAverageRatingDescription(summariesData, lowestRatings, highestRatings);
  }
};

const getSingleCompanyAverageRatingDescription = (
  summariesData: SummaryResType[],
  lowestRatings: RatingType,
  highestRatings: RatingType
) => {
  const company1 = summariesData[0];
  const company1Name = getCompanyName(company1);
  const company1Slug = company1.tag;

  const lowestRatingsReviewSite = company1Slug
    ? capitalizeFirstLetter(lowestRatings.get(company1Slug).reviewSite)
    : '';
  const lowestRating = company1Slug ? lowestRatings.get(company1Slug).rating : '';

  const highestRatingsReviewSite = company1Slug
    ? capitalizeFirstLetter(highestRatings.get(company1Slug).reviewSite)
    : '';
  const highestRating = company1Slug ? highestRatings.get(company1Slug).rating : '';

  return `${company1Name} has the lowest average rating on ${lowestRatingsReviewSite} (${lowestRating} stars) and the best on ${highestRatingsReviewSite} (${highestRating} stars).`;
};

const getTwoCompaniesAverageRatingDescription = (summariesData: SummaryResType[]) => {
  const company1 = summariesData[0];
  const company2 = summariesData[1];

  const company1Name = getCompanyName(company1);
  const company2Name = getCompanyName(company2);

  const company1Slug = company1.tag || '';
  const company2Slug = company2.tag || '';

  const company1overallRating = getOverallAverageRatingBySlug(summariesData, company1Slug);
  const company2overallRating = getOverallAverageRatingBySlug(summariesData, company2Slug);

  if (
    typeof company1overallRating === 'undefined' ||
    typeof company2overallRating === 'undefined' ||
    company1overallRating === 0 ||
    company2overallRating === 0
  )
    return '';

  const ratingDifferencePercentage =
    company1overallRating > company2overallRating
      ? getPercentageIncrease(company1overallRating, company2overallRating)
      : getPercentageDecrease(company2overallRating, company1overallRating);

  return `${company1Name}'s average rating is ${ratingDifferencePercentage}% ${
    company1overallRating > company2overallRating ? 'higher' : 'lower'
  } than ${company2Name}'s across sites.`;
};

const getThreeCompaniesAverageRatingDescription = (summariesData: SummaryResType[]) => {
  const company1 = summariesData[0];
  const company2 = summariesData[1];
  const company3 = summariesData[2];

  const company1Name = getCompanyName(company1);
  const company2Name = getCompanyName(company2);
  const company3Name = getCompanyName(company3);

  const company1Slug = company1.tag || '';
  const company2Slug = company2.tag || '';
  const company3Slug = company3.tag || '';

  const company1overallRating = getOverallAverageRatingBySlug(summariesData, company1Slug);
  const company2overallRating = getOverallAverageRatingBySlug(summariesData, company2Slug);
  const company3overallRating = getOverallAverageRatingBySlug(summariesData, company3Slug);

  if (
    typeof company1overallRating === 'undefined' ||
    typeof company2overallRating === 'undefined' ||
    typeof company3overallRating === 'undefined' ||
    company1overallRating === 0 ||
    company2overallRating === 0 ||
    company3overallRating === 0
  )
    return '';

  const ratingDifferencePercentage1 =
    company1overallRating > company2overallRating
      ? getPercentageIncrease(company1overallRating, company2overallRating)
      : getPercentageDecrease(company2overallRating, company1overallRating);

  const ratingDifferencePercentage2 =
    company1overallRating > company3overallRating
      ? getPercentageIncrease(company1overallRating, company3overallRating)
      : getPercentageDecrease(company3overallRating, company1overallRating);

  return `${company1Name}'s average rating is ${ratingDifferencePercentage1}% ${
    company1overallRating > company2overallRating ? 'higher' : 'lower'
  } than ${company2Name} and ${ratingDifferencePercentage2}% ${
    company1overallRating > company3overallRating ? 'higher' : 'lower'
  } than ${company3Name} across sites.`;
};

export const getReviewVolumeSectionDescription = (summariesData: SummaryResType[]) => {
  if (summariesData.length === 3) {
    return getThreeCompaniesReviewVolumeDescription(summariesData);
  } else if (summariesData.length === 2) {
    return getTwoCompaniesReviewVolumeDescription(summariesData);
  } else if (summariesData.length === 1) {
    return getSingleCompanyReviewVolumeDescription(summariesData);
  }
};

const getSingleCompanyReviewVolumeDescription = (summariesData: SummaryResType[]) => {
  const company1 = summariesData[0];
  const company1Name = getCompanyName(company1);

  const reviewsSummary =
    summariesData[0].review_summary.per_source
      .filter((item) => item.total > 0)
      .sort((a, b) => a.total - b.total) || [];

  if (reviewsSummary.length === 0) return '';

  const companyMostReviewsSite = capitalizeFirstLetter(
    reviewsSummary[reviewsSummary.length - 1]?.review_site || ''
  );
  const companyMostReviewsCount = reviewsSummary[reviewsSummary.length - 1]?.total || 0;

  const companyLeastReviewsSite = capitalizeFirstLetter(reviewsSummary[0]?.review_site || '');
  const companyLeastReviewsCount = reviewsSummary[0]?.total || 0;

  return `${company1Name} has the most reviews on ${companyMostReviewsSite} (${formatNumber(
    companyMostReviewsCount
  )}) and the least on ${companyLeastReviewsSite} (${companyLeastReviewsCount}).`;
};

const getTwoCompaniesReviewVolumeDescription = (summariesData: SummaryResType[]) => {
  const company1 = summariesData[0];
  const company1Name = getCompanyName(company1);

  const company2 = summariesData[1];
  const company2Name = getCompanyName(company2);

  const company1reviewsData = summariesData.find((company) => company.tag === company1.tag);
  const company1TotalReviews = company1reviewsData?.review_summary.total;

  const company2reviewsData = summariesData.find((company) => company.tag === company2.tag);
  const company2TotalReviews = company2reviewsData?.review_summary.total;

  if (
    typeof company1TotalReviews === 'undefined' ||
    typeof company2TotalReviews === 'undefined' ||
    company1TotalReviews === 0 ||
    company2TotalReviews === 0
  )
    return '';

  const ratingDifferencePercentage =
    company1TotalReviews > company2TotalReviews
      ? getPercentageIncrease(company1TotalReviews, company2TotalReviews)
      : getPercentageDecrease(company2TotalReviews, company1TotalReviews);

  return `${company1Name} has ${ratingDifferencePercentage}% ${
    company1TotalReviews > company2TotalReviews ? 'more' : 'less'
  } reviews than ${company2Name}'s across sites.`;
};

const getThreeCompaniesReviewVolumeDescription = (summariesData: SummaryResType[]) => {
  const company1 = summariesData[0];
  const company1Name = getCompanyName(company1);

  const company2 = summariesData[1];
  const company2Name = getCompanyName(company2);

  const company3 = summariesData[2];
  const company3Name = getCompanyName(company3);

  const company1TotalReviews = summariesData[0].review_summary.total;
  const company2TotalReviews = summariesData[1].review_summary.total;
  const company3TotalReviews = summariesData[2].review_summary.total;

  if (
    typeof company1TotalReviews === 'undefined' ||
    typeof company2TotalReviews === 'undefined' ||
    typeof company3TotalReviews === 'undefined' ||
    company1TotalReviews === 0 ||
    company2TotalReviews === 0 ||
    company3TotalReviews === 0
  )
    return '';

  const ratingDifferencePercentage1 =
    company1TotalReviews > company2TotalReviews
      ? getPercentageIncrease(company1TotalReviews, company2TotalReviews)
      : getPercentageDecrease(company2TotalReviews, company1TotalReviews);

  const ratingDifferencePercentage2 =
    company1TotalReviews > company3TotalReviews
      ? getPercentageIncrease(company1TotalReviews, company3TotalReviews)
      : getPercentageDecrease(company3TotalReviews, company1TotalReviews);

  return `${company1Name} has ${ratingDifferencePercentage1}% ${
    company1TotalReviews > company2TotalReviews ? 'more' : 'less'
  } reviews 
    than ${company2Name} and ${ratingDifferencePercentage2}% ${
    company1TotalReviews > company3TotalReviews ? 'more' : 'less'
  } than ${company3Name} across sites.`;
};

export const getAverageRatingOverTimeSectionDescription = (
  companiesWithReviewsData: ReviewsResType[],
  summariesData: SummaryResType[]
) => {
  if (companiesWithReviewsData.length === 3) {
    return getThreeCompaniesAverageRatingOverTimeDescription(
      companiesWithReviewsData,
      summariesData
    );
  } else if (companiesWithReviewsData.length === 2) {
    return getTwoCompaniesAverageRatingOverTimeDescription(companiesWithReviewsData, summariesData);
  } else if (companiesWithReviewsData.length === 1) {
    return getSingleCompanyAverageRatingOverTimeDescription(
      companiesWithReviewsData,
      summariesData
    );
  }
};

const getSingleCompanyAverageRatingOverTimeDescription = (
  companiesWithReviewsData: ReviewsResType[],
  summariesData: SummaryResType[]
) => {
  const company1 = companiesWithReviewsData[0];
  const company1Name =
    summariesData.find((item) => item.tag === company1.slug)?.organization.official_name || '';

  const company1averageRating3Months = getAverageRatingForMonth(companiesWithReviewsData[0], 3);

  const company1averageRatingLastMonths = getAverageRatingForMonth(companiesWithReviewsData[0], 1);

  const company1IsIncrease =
    company1averageRatingLastMonths > company1averageRating3Months ? true : false;
  const company1Trend = company1IsIncrease ? 'increased' : 'decreased';

  const company1PercentageDifference = company1IsIncrease
    ? getPercentageIncrease(+company1averageRating3Months, +company1averageRatingLastMonths)
    : getPercentageDecrease(+company1averageRatingLastMonths, +company1averageRating3Months);

  return `${company1Name}'s average rating has ${company1Trend} ${company1PercentageDifference}% in the last 3 months.`;
};

const getTwoCompaniesAverageRatingOverTimeDescription = (
  companiesWithReviewsData: ReviewsResType[],
  summariesData: SummaryResType[]
) => {
  const company1 = companiesWithReviewsData[0];
  const company1Name =
    summariesData.find((item) => item.tag === company1.slug)?.organization.official_name || '';

  const company2 = companiesWithReviewsData[1];
  const company2Name =
    summariesData.find((item) => item.tag === company2.slug)?.organization.official_name || '';

  const company1averageRating3Months = getAverageRatingForMonth(companiesWithReviewsData[0], 3);
  const company2averageRating3Months = getAverageRatingForMonth(companiesWithReviewsData[1], 3);

  const company1averageRatingLastMonths = getAverageRatingForMonth(companiesWithReviewsData[0], 1);
  const company2averageRatingLastMonths = getAverageRatingForMonth(companiesWithReviewsData[1], 1);

  const company1IsIncrease =
    company1averageRatingLastMonths > company1averageRating3Months ? true : false;
  const company1Trend = company1IsIncrease ? 'increased' : 'decreased';

  const company2IsIncrease =
    company2averageRatingLastMonths > company2averageRating3Months ? true : false;
  const company2Trend = company2IsIncrease ? 'increased' : 'decreased';

  const company1PercentageDifference = company1IsIncrease
    ? getPercentageIncrease(+company1averageRating3Months, +company1averageRatingLastMonths)
    : getPercentageDecrease(+company1averageRatingLastMonths, +company1averageRating3Months);

  const company2PercentageDifference = company2IsIncrease
    ? getPercentageIncrease(+company2averageRating3Months, +company2averageRatingLastMonths)
    : getPercentageDecrease(+company2averageRatingLastMonths, +company2averageRating3Months);

  return `${company1Name}'s average rating has ${company1Trend} ${company1PercentageDifference}% in 
  the last 3 months while ${company2Name} has ${company2Trend} ${company2PercentageDifference}% in the same period.`;
};

const getThreeCompaniesAverageRatingOverTimeDescription = (
  companiesWithReviewsData: ReviewsResType[],
  summariesData: SummaryResType[]
) => {
  const company1 = companiesWithReviewsData[0];
  const company1Name =
    summariesData.find((item) => item.tag === company1.slug)?.organization.official_name || '';

  const company2 = companiesWithReviewsData[1];
  const company2Name =
    summariesData.find((item) => item.tag === company2.slug)?.organization.official_name || '';

  const company3 = companiesWithReviewsData[2];
  const company3Name =
    summariesData.find((item) => item.tag === company3.slug)?.organization.official_name || '';

  const company1averageRating3Months = getAverageRatingForMonth(companiesWithReviewsData[0], 3);
  const company2averageRating3Months = getAverageRatingForMonth(companiesWithReviewsData[1], 3);
  const company3averageRating3Months = getAverageRatingForMonth(companiesWithReviewsData[2], 3);

  const company1averageRatingLastMonths = getAverageRatingForMonth(companiesWithReviewsData[0], 1);
  const company2averageRatingLastMonths = getAverageRatingForMonth(companiesWithReviewsData[1], 1);
  const company3averageRatingLastMonths = getAverageRatingForMonth(companiesWithReviewsData[2], 1);

  const company1IsIncrease =
    company1averageRatingLastMonths > company1averageRating3Months ? true : false;
  const company1Trend = company1IsIncrease ? 'increased' : 'decreased';

  const company2IsIncrease =
    company2averageRatingLastMonths > company2averageRating3Months ? true : false;
  const company2Trend = company2IsIncrease ? 'increased' : 'decreased';

  const company3IsIncrease =
    company3averageRatingLastMonths > company3averageRating3Months ? true : false;
  const company3Trend = company3IsIncrease ? 'increased' : 'decreased';

  const company1PercentageDifference = company1IsIncrease
    ? getPercentageIncrease(+company1averageRating3Months, +company1averageRatingLastMonths)
    : getPercentageDecrease(+company1averageRatingLastMonths, +company1averageRating3Months);

  const company2PercentageDifference = company2IsIncrease
    ? getPercentageIncrease(+company2averageRating3Months, +company2averageRatingLastMonths)
    : getPercentageDecrease(+company2averageRatingLastMonths, +company2averageRating3Months);

  const company3PercentageDifference = company3IsIncrease
    ? getPercentageIncrease(+company3averageRating3Months, +company3averageRatingLastMonths)
    : getPercentageDecrease(+company3averageRatingLastMonths, +company3averageRating3Months);

  return `${company1Name}'s average rating has ${company1Trend} ${company1PercentageDifference}% in the last 3 months, 
  while ${company2Name} has ${company2Trend} ${company2PercentageDifference}% and ${company3Name} 
  has ${company3Trend} ${company3PercentageDifference}% in the same period.`;
};

export const getReviewVolumeOverTimeSectionDescription = (
  companiesWithReviewsData: ReviewsResType[],
  summariesData: SummaryResType[]
) => {
  if (companiesWithReviewsData.length === 3) {
    return getThreeCompaniesReviewVolumeOverTimeDescription(
      companiesWithReviewsData,
      summariesData
    );
  } else if (companiesWithReviewsData.length === 2) {
    return getTwoCompaniesReviewVolumeOverTimeDescription(companiesWithReviewsData, summariesData);
  } else if (companiesWithReviewsData.length === 1) {
    return getSingleCompanyReviewVolumeOverTimeDescription(companiesWithReviewsData, summariesData);
  }
};

const getSingleCompanyReviewVolumeOverTimeDescription = (
  companiesWithReviewsData: ReviewsResType[],
  summariesData: SummaryResType[]
) => {
  const company1 = companiesWithReviewsData[0];
  const company1Name =
    summariesData.find((item) => item.tag === company1.slug)?.organization.official_name || '';
  const company1TotalReviews3Months = getTotalReviewsFor3Months(company1);

  return `${company1Name} has received ${formatNumber(
    company1TotalReviews3Months
  )} reviews in the last 3 months.`;
};

const getTwoCompaniesReviewVolumeOverTimeDescription = (
  companiesWithReviewsData: ReviewsResType[],
  summariesData: SummaryResType[]
) => {
  const company1 = companiesWithReviewsData[0];
  const company1Name =
    summariesData.find((item) => item.tag === company1.slug)?.organization.official_name || '';

  const company2 = companiesWithReviewsData[1];
  const company2Name =
    summariesData.find((item) => item.tag === company2.slug)?.organization.official_name || '';

  const company1TotalReviews3Months = getTotalReviewsFor3Months(companiesWithReviewsData[0]);
  const company2TotalReviews3Months = getTotalReviewsFor3Months(companiesWithReviewsData[1]);

  const ratingDifferencePercentage1 =
    company1TotalReviews3Months > company2TotalReviews3Months
      ? getPercentageIncrease(company1TotalReviews3Months, company2TotalReviews3Months)
      : getPercentageDecrease(company2TotalReviews3Months, company1TotalReviews3Months);

  return `${company1Name} has received ${ratingDifferencePercentage1}% ${
    company1TotalReviews3Months > company2TotalReviews3Months ? 'more' : 'less'
  } reviews compared to ${company2Name} in the last 3 months.`;
};

const getThreeCompaniesReviewVolumeOverTimeDescription = (
  companiesWithReviewsData: ReviewsResType[],
  summariesData: SummaryResType[]
) => {
  const company1 = companiesWithReviewsData[0];
  const company1Name =
    summariesData.find((item) => item.tag === company1.slug)?.organization.official_name || '';

  const company2 = companiesWithReviewsData[1];
  const company2Name =
    summariesData.find((item) => item.tag === company2.slug)?.organization.official_name || '';

  const company3 = companiesWithReviewsData[2];
  const company3Name =
    summariesData.find((item) => item.tag === company3.slug)?.organization.official_name || '';

  const company1TotalReviews3Months = getTotalReviewsFor3Months(companiesWithReviewsData[0]);
  const company2TotalReviews3Months = getTotalReviewsFor3Months(companiesWithReviewsData[1]);
  const company3TotalReviews3Months = getTotalReviewsFor3Months(companiesWithReviewsData[2]);

  const ratingDifferencePercentage1 =
    company1TotalReviews3Months > company2TotalReviews3Months
      ? getPercentageIncrease(company1TotalReviews3Months, company2TotalReviews3Months)
      : getPercentageDecrease(company2TotalReviews3Months, company1TotalReviews3Months);

  const ratingDifferencePercentage2 =
    company1TotalReviews3Months > company3TotalReviews3Months
      ? getPercentageIncrease(company1TotalReviews3Months, company3TotalReviews3Months)
      : getPercentageDecrease(company3TotalReviews3Months, company1TotalReviews3Months);

  return `${company1Name} has received ${ratingDifferencePercentage1}% ${
    company1TotalReviews3Months > company2TotalReviews3Months ? 'more' : 'less'
  } reviews compared to
   ${company2Name} and ${ratingDifferencePercentage2}% ${
    company1TotalReviews3Months > company3TotalReviews3Months ? 'more' : 'less'
  } than ${company3Name} in the last 3 months.`;
};

const getCompanyName = (summariesData?: SummaryResType) => {
  return summariesData?.organization.official_name || '';
};

const getAverageRatingForMonth = (reviewsData: ReviewsResType, forMonth: number) => {
  const averageRatings = reviewsData.timeseries?.filter((company) => {
    const today = new Date();
    const forMonthDate = new Date(today.getFullYear(), today.getMonth() - forMonth, 1);
    const nextMonthDate = new Date(today.getFullYear(), today.getMonth() - (forMonth - 1), 1);
    const ratingDate = new Date(company.date);

    return ratingDate >= forMonthDate && ratingDate < nextMonthDate;
  });

  if (typeof averageRatings === 'undefined') return 0;

  const filterEmptyRatings = averageRatings.filter((item) => item.average_rating !== 0);
  const sumOfAverageratings = filterEmptyRatings.reduce(
    (acc, curr) => acc + curr.average_rating,
    0
  );

  return sumOfAverageratings === 0
    ? sumOfAverageratings
    : (sumOfAverageratings / filterEmptyRatings.length).toFixed(2);
};

const getTotalReviewsFor3Months = (reviewsData: ReviewsResType) => {
  const reviews = reviewsData.timeseries?.filter((company) => {
    const today = new Date();
    const forMonthDate = new Date(today.getFullYear(), today.getMonth() - 3, 1);
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const ratingDate = new Date(company.date);

    return ratingDate >= forMonthDate && ratingDate < thisMonth;
  });

  if (typeof reviews === 'undefined') return 0;

  return reviews.reduce((acc, curr) => acc + curr.total_reviews, 0);
};

const getOverallAverageRatingBySlug = (summariesData: SummaryResType[], slug: string) => {
  return summariesData.find((company) => company.tag === slug)?.review_summary.average_rating;
};
