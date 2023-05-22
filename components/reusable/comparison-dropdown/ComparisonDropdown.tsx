import React, { useState } from 'react';
import styles from './comparisonDropdown.module.scss';
import Link from 'next/link';
import ClearbitImage from '../clearbit-image/ClearbitImage';
import Container from '../container/Container';
import Icon from '../icon/Icon';
import useCompanies from '../../../providers/CompaniesProvider';
import SearchAutocomplete from '../search-autocomplete/SearchAutocomplete';
import { useRouter } from 'next/router';

const ComparisonDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { companyNames, summariesData, companySlugs } = useCompanies();

  const companyUrls = summariesData.map((item) => item.organization.website || '');

  const handleDropdownOpen = () => {
    setIsOpen((prevState) => !prevState);
  };

  const getUrlWithoutCurrentSlug = (companySlugToRemove: string): string => {
    if (!Array.isArray(router.query.slug)) return router.query.slug || '';
    const filtered = router.query.slug?.filter(
      (slug) => slug !== 'vs' && slug !== companySlugToRemove
    );

    return '/' + filtered.join('/vs/');
  };

  return (
    <div className={styles.comparisonWrapper}>
      <Container className={styles.comparison}>
        {companyNames.map((companyName, index) => {
          const companyUrlWithoutCurrentSlug = getUrlWithoutCurrentSlug(companySlugs[index]);

          return (
            <div key={index} className={styles.singleCompany}>
              <ClearbitImage
                url={companyUrls[index]}
                width={26}
                disablePlaceholder
                className={styles.companyLogo}
              />
              <p>{companyName}</p>
              {companyNames.length > 1 && (
                <Link
                  href={`/reviews${companyUrlWithoutCurrentSlug}`}
                  className={styles.removeCompanyBtn}
                  passHref
                >
                  <Icon name="Close" />
                </Link>
              )}
              {index <= 1 && <div className={styles.vs}>VS.</div>}
            </div>
          );
        })}
        {companyNames.length < 3 && (
          <>
            <div className={styles.companySearchWrapper}>
              <button className={styles.addToCompareTrigger} onClick={handleDropdownOpen}>
                <Icon name="Plus" />
                Add to compare
              </button>
              <SearchAutocomplete
                isOpen={isOpen}
                handleClose={() => setIsOpen(false)}
                excludeSlugs={companySlugs}
              />
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default ComparisonDropdown;
