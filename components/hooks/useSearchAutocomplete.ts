import debounce from 'lodash/debounce';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { CompaniesSuggestionsResponseType, CompanySuggestionType } from '../../pages/api/companies';
import { AxiosResponse } from 'axios';
import { newFetch } from '../../utils/fetch';
import { useRouter } from 'next/router';
import { companySearchRequest } from '../../api/api';

type useSearchAutocompleteType = {
  searchInput: string;
  excludeSlugs?: string[];
};

const useSearchAutocomplete = ({ searchInput, excludeSlugs = [] }: useSearchAutocompleteType) => {
  const [dropdownError, setDropdownError] = useState('');
  const [dropdownLoading, setDropdownLoading] = useState(false);
  const [companySuggestions, setCompanySuggestions] = useState<CompanySuggestionType[]>([]);
  const [fetched, setFetched] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    setFetched(true);
    setDropdownError('');
    setDropdownLoading(true);

    if (searchInput.length < 3) {
      setDropdownError('Type at least 3 characters.');
      setDropdownLoading(false);

      return;
    }

    try {
      const companiesRes: CompaniesSuggestionsResponseType = await companySearchRequest({
        name: searchInput,
      });

      const filteredCompanies = companiesRes.companies.filter(
        (company) => !excludeSlugs.includes(company.tag)
      );

      setCompanySuggestions(filteredCompanies);
      setDropdownLoading(false);
    } catch (err) {
      setDropdownLoading(false);
      setDropdownError('Something went wrong, refresh the page and try again.');
      console.log(err);
    }
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleSubmit, 400);
  }, [searchInput]);

  const handleRouteChange = () => {
    setFetched(false);
    setCompanySuggestions([]);
  };

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    if (searchInput.length === 0) return;

    debouncedResults();

    return () => {
      debouncedResults.cancel();
    };
  }, [searchInput]);

  return {
    dropdownError,
    dropdownLoading,
    companySuggestions,
    setCompanySuggestions,
    fetched,
    setFetched,
    handleSubmit,
  };
};

export default useSearchAutocomplete;
