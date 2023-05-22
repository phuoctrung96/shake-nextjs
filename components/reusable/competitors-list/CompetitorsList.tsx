import React from 'react';
import styles from './competitorsList.module.scss';
import ClearbitImage from '../clearbit-image/ClearbitImage';
import BaseLink from '../base-link/BaseLink';
import StarsRating from '../stars-rating/StarsRating';
import useCompanies from '../../../providers/CompaniesProvider';
import { CompetitorsResultsType } from '../../../types/companies';
import { Skeleton, Stack } from '@mui/material';
import Link from 'next/link';
import { shortenNumber } from '../../../utils/utils';

const COLS = [
  { mobile: 'Company', desktop: 'Company' },
  { mobile: 'R. Vol', desktop: 'Review volume' },
  { mobile: 'Avg R.', desktop: 'Average rating' },
  { mobile: 'Category', desktop: 'Category' },
  { mobile: 'Rank', desktop: 'Rank' },
];

const ROWS: CompetitorsResultsType[] = [
  {
    url: 'alexa.com',
    name: 'alexa.com',
    number_of_reviews: 122365,
    average_rating: 4.6,
    industry: 'Business and Consumer Services',
    rank: 381,
  },
  {
    url: 'semrush.com',
    name: 'semrush.com',
    number_of_reviews: 122365,
    average_rating: 4.6,
    industry: 'Business and Consumer Services',
    rank: 381,
  },
  {
    url: 'ahrefs.com',
    name: 'ahrefs.com',
    number_of_reviews: 122365,
    average_rating: 4.6,
    industry: 'Business and Consumer Services',
    rank: 381,
  },
  {
    url: 'siteslike.com',
    name: 'siteslike.com',
    number_of_reviews: 122365,
    average_rating: 4.6,
    industry: 'Business and Consumer Services',
    rank: 381,
  },
  {
    url: 'moz.com',
    name: 'moz.com',
    number_of_reviews: 122365,
    average_rating: 4.6,
    industry: 'Business and Consumer Services',
    rank: 381,
  },
  {
    url: 'spyfu.com',
    name: 'spyfu.com',
    number_of_reviews: 122365,
    average_rating: 4.6,
    industry: 'Business and Consumer Services',
    rank: 381,
  },
  {
    url: 'hotjar.com',
    name: 'hotjar.com',
    number_of_reviews: 122365,
    average_rating: 4.6,
    industry: 'Business and Consumer Services',
    rank: 381,
  },
  {
    url: 'blackhatworld.com',
    name: 'blackhatworld.com',
    number_of_reviews: 122365,
    average_rating: 4.6,
    industry: 'Business and Consumer Services',
    rank: 381,
  },
  {
    url: 'hubspot.com',
    name: 'hubspot.com',
    number_of_reviews: 122365,
    average_rating: 4.6,
    industry: 'Business and Consumer Services',
    rank: 381,
  },
  {
    url: 'searchenginejournal.com',
    name: 'searchenginejournal.com',
    number_of_reviews: 122365,
    average_rating: 4.6,
    industry: 'Business and Consumer Services',
    rank: 381,
  },
];

const CompetitorsList = () => {
  const { competitorsData } = useCompanies();
  const rowData = competitorsData[0]?.success ? competitorsData[0].results : ROWS;

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.listWrapper}>
        {competitorsData[0]?.loading ? (
          <Stack spacing={1} marginTop={1}>
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} variant="text" width="100%" animation="wave" height={30} />
              ))}
          </Stack>
        ) : (
          <table>
            <thead>
              <tr>
                {COLS.map((col, index) => (
                  <th key={index} className={col.mobile === 'Category' ? styles.desktopOnly : ''}>
                    <span className={styles.mobileOnly}>{col.mobile}</span>
                    <span className={styles.desktopOnly}>{col.desktop}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rowData.map((row, index) => (
                <tr key={index}>
                  <td className={styles.site}>
                    {row.tag ? (
                      <div>
                        <Link href={`/reviews/${row.tag}`} passHref>
                          <ClearbitImage
                            url={row.url || ''}
                            width={26}
                            className={styles.siteLogo}
                          />
                          <span>{row.name}</span>
                        </Link>
                      </div>
                    ) : (
                      <div>
                        <ClearbitImage url={row.url || ''} width={26} className={styles.siteLogo} />
                        <span>{row.name}</span>
                      </div>
                    )}
                  </td>
                  <td className={styles.reviews}>{shortenNumber(row.number_of_reviews, 1000)}</td>
                  <td className={styles.rating}>
                    {row.average_rating}
                    <StarsRating rating={row.average_rating} className={styles.desktopOnly} />
                  </td>
                  <td className={`${styles.category} ${styles.desktopOnly}`}>{row.industry}</td>
                  <td className={styles.rank}>{`#${row.rank}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!competitorsData[0].success && (
          <div className={styles.cta}>
            <BaseLink href="/contact-us" title="Get full access"></BaseLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompetitorsList;
