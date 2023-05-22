import React from 'react';
import styles from './profilePageCharts.module.scss';
import Card from '../card/Card';
import LineChart from '../line-chart/LineChart';
import BarChart, { BarChartType } from '../bar-chart/BarChart';
import { sampleData } from './profilePageData';
import { getLastSixMonths, monthNames } from '../../../utils/utils';
import useCompanies from '../../../providers/CompaniesProvider';
import { Serie } from '@nivo/line';
import {
  getAverageRatingOverTimeSectionDescription,
  getAverageRatingSectionDescription,
  getReviewVolumeOverTimeSectionDescription,
  getReviewVolumeSectionDescription,
} from '../../../utils/cardDescriptions';

interface IMap<K, V> extends Map<K, V> {
  get(key: K): V;
}

export type RatingType = IMap<string, { [key in 'rating' | 'reviewSite']: string }>;

const ProfilePageCharts = () => {
  const {
    reviewsData,
    displayedCompanies,
    companyNames,
    summariesData,
    companiesWithReviewsData,
    companiesWithTimeseriesData,
  } = useCompanies();

  const lastSixMonths = getLastSixMonths();

  const getSampleData = (dataType: keyof typeof sampleData): Serie[] | BarChartType[] => {
    return sampleData[dataType][displayedCompanies];
  };

  const getBarChart = (fieldName: 'average_rating' | 'total') => {
    if (!reviewsData) return [];

    let averageRatings: { [key: string]: { [key: string]: number } } = {};
    summariesData.map(({ review_summary, tag }, index) => {
      return review_summary.per_source.map((source) => {
        averageRatings[source.review_site] = {
          ...averageRatings[source.review_site],
          ['company' + (index + 1)]: source[fieldName],
        };
      });
    });

    const averageRatingsArray = [];

    for (const averageRating in averageRatings) {
      averageRatingsArray.push({
        name: averageRating,
        ...(averageRatings[averageRating].company1 &&
          averageRatings[averageRating].company1 > 0 && {
            company1: averageRatings[averageRating].company1,
          }),
        ...(averageRatings[averageRating].company2 &&
          averageRatings[averageRating].company2 > 0 && {
            company2: averageRatings[averageRating].company2,
          }),
        ...(averageRatings[averageRating].company3 &&
          averageRatings[averageRating].company3 > 0 && {
            company3: averageRatings[averageRating].company3,
          }),
      });
    }

    return averageRatingsArray.filter(
      (averageRating) => averageRating.company1 || averageRating.company2 || averageRating.company3
    );
  };

  const getDataOverTime = (
    dataField: 'average_rating' | 'total_reviews',
    resultType: 'mean' | 'sum'
  ): Serie[] => {
    if (!companiesWithReviewsData) return [];
    const result = companiesWithReviewsData.map((company, index) => {
      const dataPerMonth = new Map();

      company.timeseries?.map((day) => {
        const monthOfReview =
          monthNames[new Date(day.date).getMonth().toString() as keyof typeof monthNames];

        if (lastSixMonths.includes(monthOfReview) && day[dataField] !== 0) {
          dataPerMonth.set(monthOfReview, [
            ...(dataPerMonth.get(monthOfReview) || []),
            day[dataField],
          ]);
        }
      });

      const sortedDataPerMonth = new Map(
        [...dataPerMonth.entries()].sort((a, b) => {
          const lastSixMonths = getLastSixMonths();

          let indA = lastSixMonths.indexOf(a[0]);
          let indB = lastSixMonths.indexOf(b[0]);

          if (indA == -1) indA = lastSixMonths.length - 1;
          if (indB == -1) indB = lastSixMonths.length - 1;

          if (indA < indB) {
            return -1;
          } else if (indA > indB) {
            return 1;
          }

          return 0;
        })
      );

      const aggregatedDataPerMonth = new Map();

      sortedDataPerMonth.forEach((data, month) => {
        aggregatedDataPerMonth.set(
          month,
          resultType === 'mean'
            ? (data.reduce((a: number, b: number) => a + b, 0) / data.length).toFixed(2)
            : data.reduce((a: number, b: number) => a + b, 0).toFixed(0)
        );
      });
      return {
        id: 'company' + (index + 1),
        data: Array.from(aggregatedDataPerMonth.entries()).map(([month, data]) => ({
          x: month,
          y: +data,
        })),
      };
    });
    const monthsWithFullData = result.filter((company) => company.data.length === 6);

    if (companiesWithReviewsData.length === 3) {
      return [
        monthsWithFullData.find((month) => month.id === 'company1') || { id: 'company1', data: [] },
        monthsWithFullData.find((month) => month.id === 'company2') || { id: 'company2', data: [] },
        monthsWithFullData.find((month) => month.id === 'company3') || { id: 'company3', data: [] },
      ];
    } else if (companiesWithReviewsData.length === 2) {
      return [
        monthsWithFullData.find((month) => month.id === 'company1') || { id: 'company1', data: [] },
        monthsWithFullData.find((month) => month.id === 'company2') || { id: 'company2', data: [] },
      ];
    }
    return [
      monthsWithFullData.find((month) => month.id === 'company1') || { id: 'company1', data: [] },
    ];
  };

  const getAwerageRatings = (type: 'lowest' | 'highest'): RatingType => {
    let ratings: RatingType = new Map();

    var operators = {
      lowest: (a: number, b: number) => {
        return a < b;
      },
      highest: (a: number, b: number) => {
        return a > b;
      },
    };

    summariesData.map(({ review_summary, tag }) => {
      review_summary.per_source
        .filter((source) => source.average_rating !== 0)
        .map((source, index) => {
          if (index === 0) {
            ratings.set(tag, {
              rating: source.average_rating.toString(),
              reviewSite: source.review_site,
            });
          } else if (
            operators[type](source.average_rating, +ratings.get(tag).rating) &&
            source.total > 0
          ) {
            ratings.set(tag, {
              rating: source.average_rating.toString(),
              reviewSite: source.review_site,
            });
          }
        });
    });

    return ratings;
  };

  const lowestRatings = getAwerageRatings('lowest');
  const highestRatings = getAwerageRatings('highest');

  const averageRating = getBarChart('average_rating');
  const averageRatingDataLength = Object.keys(averageRating).length;

  const reviewVolume = getBarChart('total');
  const reviewVolumeDataLength = Object.keys(reviewVolume).length;

  const averageRatingOverTime = getDataOverTime('average_rating', 'mean') || {};
  const averageRatingOverTimeDataLength = averageRatingOverTime.reduce(
    (acc: number, curr) => (curr.data.length > 0 ? ++acc : acc),
    0
  );

  const reviewVolumeOverTime = getDataOverTime('total_reviews', 'sum') || {};
  const reviewVolumeOverTimeDataLength = reviewVolumeOverTime.reduce(
    (acc: number, curr) => (curr.data.length > 0 ? ++acc : acc),
    0
  );

  return (
    <div className={styles.chartsWrapper}>
      <Card
        title="Average rating by site"
        description={getAverageRatingSectionDescription(
          lowestRatings,
          highestRatings,
          summariesData
        )}
        {...(averageRatingDataLength === 0 && {
          blurred: true,
          blurLinkText: 'Discover trends',
        })}
      >
        <BarChart
          selectedCompaniesCount={displayedCompanies}
          chartData={
            averageRatingDataLength === 0
              ? (getSampleData('averageRating') as BarChartType[])
              : averageRating
          }
          tooltipText="Average rating on"
          maxValue={5}
          companyNames={companyNames}
        />
      </Card>
      <Card
        title="Average rating over time"
        description={getAverageRatingOverTimeSectionDescription(
          companiesWithTimeseriesData,
          summariesData
        )}
        {...(averageRatingOverTimeDataLength === 0 && {
          blurred: true,
          blurLinkText: 'Discover trends',
        })}
      >
        <LineChart
          selectedCompaniesCount={displayedCompanies}
          chartData={
            averageRatingOverTimeDataLength === 0
              ? (getSampleData('averageRatingOverTime') as Serie[])
              : averageRatingOverTime
          }
          tooltipText="Average rating"
          companyNames={companyNames}
        />
      </Card>
      <Card
        title="Review volume by site"
        description={getReviewVolumeSectionDescription(summariesData)}
        {...(reviewVolumeDataLength === 0 && {
          blurred: true,
          blurLinkText: 'Discover trends',
        })}
      >
        <BarChart
          selectedCompaniesCount={displayedCompanies}
          chartData={
            reviewVolumeDataLength === 0
              ? (getSampleData('reviewVolume') as BarChartType[])
              : reviewVolume
          }
          tooltipText="Total reviews on"
          companyNames={companyNames}
        />
      </Card>
      <Card
        title="Review volume over time"
        description={getReviewVolumeOverTimeSectionDescription(
          companiesWithTimeseriesData,
          summariesData
        )}
        {...(reviewVolumeOverTimeDataLength === 0 && {
          blurred: true,
          blurLinkText: 'Discover trends',
        })}
      >
        <LineChart
          selectedCompaniesCount={displayedCompanies}
          chartData={
            reviewVolumeOverTimeDataLength === 0
              ? (getSampleData('reviewVolumeOverTime') as Serie[])
              : reviewVolumeOverTime
          }
          tooltipText="Total reviews"
          companyNames={companyNames}
        />
      </Card>
    </div>
  );
};

export default ProfilePageCharts;
