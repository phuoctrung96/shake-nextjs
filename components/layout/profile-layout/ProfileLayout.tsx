import React from 'react';
import styles from './profileLayout.module.scss';
import Container from '../../reusable/container/Container';
import Card, { BorderColor } from '../../reusable/card/Card';
import Tag from '../../reusable/tag/Tag';
import ReviewsSummary from '../../reusable/reviews-summary/ReviewsSummary';
import ProfilePageCharts from '../../reusable/profile-page-charts/ProfilePageCharts';
import WordCloud from '../../reusable/word-cloud/WordCloud';
import Review from '../../reusable/review/Review';
import ProfilesSection from '../../reusable/profile-section/ProfilesSection';
import Image from 'next/image';
import CompetitorsList from '../../reusable/competitors-list/CompetitorsList';
import ComparisonDropdown from '../../reusable/comparison-dropdown/ComparisonDropdown';
import useCompanies from '../../../providers/CompaniesProvider';
import BaseLink from '../../reusable/base-link/BaseLink';
import ReviewRichSnippet from '../../reusable/review-rich-snippet/ReviewRichSnippet';
import SectionTitle from '../../reusable/section-title/SectionTitle';
import SeoTags from '../../reusable/seo-tags/SeoTags';
import { CompaniesCountType } from '../../../types/companies';
import { useRouter } from 'next/router';
import { getDaysAgo, getMetaDescription, getMetaTitle, shortenNumber } from '../../../utils/utils';
import { wordCloudSampleData } from '../../reusable/word-cloud/wordCloudData';
import { reviewsDummyData } from '../../reusable/review/reviewData';
import DynamicOgImage from '../../reusable/dynamic-og-image/DynamicOgImage';
import { Skeleton } from '@mui/material';

const colors: { '1': BorderColor; '2': BorderColor; '3': BorderColor } = {
  '1': 'blue',
  '2': 'orange',
  '3': 'red',
};

const ProfileLayout = () => {
  const { summariesData, companyNames, countOfAllLocations, wordCloudData, competitorsData } =
    useCompanies();
  const router = useRouter();

  const profilesCount = shortenNumber(
    summariesData.reduce(
      (acc, companySummary) => acc + companySummary.profile_summary.total_profiles,
      0
    ),
    1000
  );

  const reviewsCount = shortenNumber(
    summariesData.reduce((acc, companySummary) => acc + companySummary.review_summary.total, 0),
    1000
  );

  const profileSourceWebsites = summariesData[0].profile_summary.per_source.map(
    (item) => item.source
  );

  const getDaysAgoText = () => {
    const daysAgo = getDaysAgo(summariesData[0].updatedOn);

    if (daysAgo === 0) return 'today';
    if (daysAgo === 1) return 'yesterday';

    return daysAgo + ' days ago';
  };

  return (
    <div
      className={`${styles.profileWrapper} ${
        summariesData.length === 1 ? styles.profileWrapper1col : ''
      }${summariesData.length === 2 ? styles.profileWrapper2cols : ''} ${
        summariesData.length === 3 ? styles.profileWrapper3cols : ''
      }`}
    >
      <DynamicOgImage />
      <ComparisonDropdown />
      <Container>
        <div className={styles.mainTitle}>
          <div className={styles.content}>
            <h1>Analyze Online Reviews</h1>
            <p>
              Analyze and compare customer experience using aggregated online reviews, for up to 3
              companies and/or industry benchmarks.
            </p>
          </div>
          <BaseLink
            href={`/contact-us?referUrl=${encodeURIComponent(
              process.env.NEXT_PUBLIC_FETCH_URL?.slice(0, -1) + router.asPath
            )}`}
            title="Gain deeper insights"
            className={styles.blurLink}
            rel="nofollow"
          />
        </div>

        <div className={styles.companyInfo}>
          {summariesData.map(({ organization }, index) => {
            const tags = [
              organization?.industry,
              organization?.sub_industry,
              organization?.sector,
              organization?.number_of_employees ? organization?.number_of_employees.toString() : '',
            ];

            const tagsWithValues = tags.filter((tag) => tag);

            return (
              <Card
                key={index}
                title={organization?.official_name || ''}
                mainCard
                logo={organization?.website || ''}
                description={organization?.description}
                borderColor={colors[(index + 1).toString() as '1' | '2' | '3']}
                borderTop
                truncateDescription
              >
                {tagsWithValues.length > 0 && (
                  <>
                    <hr />
                    <div className={styles.tagWrapper}>
                      {tags.map((tag, index) => {
                        if (tag) {
                          return <Tag name={tag} key={index} />;
                        }
                      })}
                    </div>
                  </>
                )}
              </Card>
            );
          })}

          {summariesData.map((companySummary, index) => {
            return (
              <Card
                key={index}
                borderColor={colors[(index + 1).toString() as '1' | '2' | '3']}
                className={styles.reviewSummaryWrapper}
              >
                <ReviewsSummary
                  rating={Math.round(companySummary.review_summary.average_rating * 10) / 10}
                  reviewsTotalCount={companySummary.review_summary.total}
                />
                <hr />
                <ProfilesSection
                  key={index}
                  companyName={companyNames[index]}
                  perSourceSummary={companySummary.profile_summary}
                  profiles={companySummary.sample_profiles}
                />
              </Card>
            );
          })}
        </div>

        <ProfilePageCharts />

        {countOfAllLocations > 0 && (
          <Card className={styles.worldMapWrapper} blurred>
            <Image src="/images/about-us/world.svg" width={344} height={148} alt="World Map" />
          </Card>
        )}

        <div className={styles.aboutDataWrapper}>
          <div className={styles.aboutData}>
            <h2>About this data</h2>
            <p>
              We&apos;re creating a more transparent world by making it easier for anyone to analyze
              and compare companies using their online reviews. This site provides a singular view
              for customer experience, whether it&apos;s a company with 1 to 50k+ locations,
              software businesses, e-commerce players and more.
            </p>
            {typeof summariesData[0].updatedOn !== 'undefined' && (
              <p>
                <em>This data was last updated {getDaysAgoText()}.</em>
              </p>
            )}
            <BaseLink
              title="Get in touch"
              className={styles.signUpBtn}
              href={`/contact-us?referUrl=${encodeURIComponent(
                process.env.NEXT_PUBLIC_FETCH_URL?.slice(0, -1) + router.asPath
              )}`}
            />
          </div>
        </div>
      </Container>

      {competitorsData[0].success && (
        <div className={styles.competitorsWrapper}>
          <Container>
            <SectionTitle title="Competitors & similar companies" type="Secondary">
              Check out how other companies stack up in customer experience.
            </SectionTitle>
            <CompetitorsList />
          </Container>
        </div>
      )}

      <Container className={styles.wordCloudSectionWrapper}>
        <SectionTitle title="What people are saying" type="Secondary">
          Discover the trending topics driving positive and negative sentiment.
        </SectionTitle>
        <div
          className={`${styles.bottomSectionWrapper} ${
            styles['bottomSectionWrapper' + summariesData.length]
          }`}
        >
          {wordCloudData.map((wordCloud, index) => {
            const isWordCloudLoading = !!wordCloud?.loading;
            const isWordCloudNoData = !wordCloud?.success;

            return (
              <Card
                key={index}
                borderColor={colors[(index + 1) as CompaniesCountType]}
                className={`${styles.wordCloudWrapper} ${styles.bottomSection}  ${
                  styles['bottomSectionItem' + (index + 1)]
                }`}
                {...(isWordCloudNoData &&
                  !isWordCloudLoading && {
                    blurred: true,
                    blurValue: 7,
                    blurLinkText: 'Discover topics',
                  })}
              >
                {isWordCloudLoading ? (
                  <>
                    <Skeleton variant="text" width="100%" animation="wave" height={30} />
                    <Skeleton variant="text" width="100%" animation="wave" height={30} />
                    <Skeleton variant="text" width="100%" animation="wave" height={30} />
                    <Skeleton variant="text" width="100%" animation="wave" height={30} />
                  </>
                ) : (
                  <WordCloud
                    title={companyNames[index]}
                    titleColor={colors[(index + 1) as CompaniesCountType]}
                    words={isWordCloudNoData ? wordCloudSampleData[0] : wordCloud}
                  />
                )}
              </Card>
            );
          })}

          {summariesData.map(({ sample_reviews }, index) => {
            return (
              <Card
                key={index}
                borderColor={colors[(index + 1) as CompaniesCountType]}
                className={`${styles.reviewsWrapper} ${styles['bottomSectionItem' + (index + 3)]}`}
                {...(sample_reviews.length === 0 && {
                  blurred: true,
                  blurLinkText: 'See what people are saying',
                })}
              >
                {sample_reviews.length === 0 &&
                  reviewsDummyData.map((review, index) => (
                    <Review
                      key={index}
                      content={review.content}
                      date={review.date.toString()}
                      rating={review.rating}
                      title={review.reviewer}
                    />
                  ))}
                {sample_reviews.map(({ text, date, rating, reviewer }, index) => {
                  if (index > 5) return null;
                  return (
                    <Review
                      key={index}
                      content={text || ''}
                      date={date.toString() || ''}
                      rating={rating}
                      title={reviewer || ''}
                    />
                  );
                })}
              </Card>
            );
          })}
        </div>
      </Container>

      <SeoTags
        metaTitle={getMetaTitle(summariesData.length as 1 | 2 | 3, companyNames, profilesCount)}
        metaDescription={getMetaDescription(
          summariesData.length as 1 | 2 | 3,
          companyNames,
          reviewsCount,
          profileSourceWebsites,
          profilesCount
        )}
      />

      <ReviewRichSnippet
        name={summariesData[0].organization.official_name || ''}
        ratingValue={summariesData[0].review_summary.average_rating}
        ratingCount={summariesData[0].review_summary.total}
      />
    </div>
  );
};

export default ProfileLayout;
