import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './searchAutocomplete.module.scss';
import Loader from '../loader/Loader';
import ClearbitImage from '../clearbit-image/ClearbitImage';
import Link from 'next/link';
import useSearchAutocomplete from '../../hooks/useSearchAutocomplete';
import { ClickAwayListener } from '@mui/material';
import { useRouter } from 'next/router';

type SearchAutocompleteType = {
  isOpen: boolean;
  handleClose: () => void;
  excludeSlugs?: string[];
};

const SearchAutocomplete = ({ isOpen, handleClose, excludeSlugs = [] }: SearchAutocompleteType) => {
  const [companySearchInput, setCompanySearchInput] = useState('');
  const [linkPressed, setLinkPressed] = useState<number | undefined>();

  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCompanySearchInput(event.target.value);
  };

  const { dropdownError, fetched, dropdownLoading, companySuggestions, setFetched } =
    useSearchAutocomplete({
      searchInput: companySearchInput,
      excludeSlugs,
    });

  const handleRouteChange = () => {
    setCompanySearchInput('');
    setFetched(false);
    handleClose();
    setLinkPressed(undefined);
  };

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return isOpen ? (
    <ClickAwayListener onClickAway={handleClose}>
      <div className={styles.companySearch}>
        <input
          type="text"
          value={companySearchInput}
          onChange={handleChange}
          placeholder="Search for a company"
          autoFocus
        />
        {dropdownError && (
          <>
            <hr />
            <p>{dropdownError}</p>
          </>
        )}
        {dropdownLoading && (
          <div className={styles.bgLoaderWrapper}>
            <Loader type="secondary" />
          </div>
        )}
        {fetched && companySuggestions.length === 0 && !dropdownError && !dropdownLoading && (
          <div>
            <hr />
            <p>We couldn’t find that company, please contact us to extend our coverage.</p>
          </div>
        )}
        {fetched && companySuggestions.length > 0 && !dropdownError && (
          <div>
            {companySuggestions.map((company, index) => {
              return (
                <div key={index}>
                  <hr />
                  <Link
                    href={`${router.asPath}/vs/${company.tag}`}
                    passHref
                    shallow
                    className={styles.singleCompanyResult}
                    onClick={() => {
                      setLinkPressed(index);
                    }}
                  >
                    {company.url === null ? (
                      <div style={{ width: '26px' }} />
                    ) : (
                      <ClearbitImage url={company.url || ''} width={26} />
                    )}
                    {company.name}
                    {typeof linkPressed !== 'undefined' && linkPressed === index && (
                      <Loader type="secondary" className={styles.loader} />
                    )}
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </ClickAwayListener>
  ) : null;
};

export default SearchAutocomplete;
