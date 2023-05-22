import React, { ChangeEvent, useState } from 'react';
import styles from './heroLookupForm.module.scss';
import Link from 'next/link';
import Loader from '../../reusable/loader/Loader';
import useSearchAutocomplete from '../../hooks/useSearchAutocomplete';
import ClearbitImage from '../../reusable/clearbit-image/ClearbitImage';
import { ClickAwayListener } from '@mui/material';
import BaseButton from '../../reusable/base-button/BaseButton';

const HeroLookupForm = () => {
  const [searchInput, setSearchInput] = useState('');
  const [linkPressed, setLinkPressed] = useState<number | undefined>();

  const { dropdownError, fetched, setFetched, dropdownLoading, companySuggestions, handleSubmit } =
    useSearchAutocomplete({
      searchInput,
    });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleClose = () => {
    setFetched(false);
  };

  const handleLinkClick = (index: number) => {
    setLinkPressed(index);
  };

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={searchInput}
          onChange={handleChange}
          placeholder="Search for a company"
        />
        {dropdownLoading && (
          <div className={styles.bgLoaderWrapper}>
            <Loader type="secondary" />
          </div>
        )}
        <BaseButton viewType="primary" onClick={() => handleSubmit()}>
          Analyze reviews
        </BaseButton>
      </div>
      {fetched && (
        <ClickAwayListener onClickAway={handleClose}>
          <div className={styles.results}>
            {dropdownError && <p className={styles.errorWrapper}>{dropdownError}</p>}

            {fetched && companySuggestions.length === 0 && !dropdownError && !dropdownLoading && (
              <div>
                <p>We couldn’t find that company, please contact us to extend our coverage.</p>
              </div>
            )}

            {fetched && companySuggestions.length > 0 && !dropdownError && (
              <ul>
                {companySuggestions.map(({ name, tag, url }, index) => {
                  return (
                    <li key={index}>
                      <Link
                        href={`/reviews/${tag}`}
                        passHref
                        className={styles.nameLink}
                        onClick={() => handleLinkClick(index)}
                      >
                        <div className={styles.logoWrapper}>
                          {url === null ? (
                            <div style={{ width: '26px' }} />
                          ) : (
                            <ClearbitImage url={url || ''} width={26} />
                          )}
                        </div>
                        {name}
                        {typeof linkPressed !== 'undefined' && linkPressed === index && (
                          <Loader type="secondary" className={styles.loader} />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default HeroLookupForm;
