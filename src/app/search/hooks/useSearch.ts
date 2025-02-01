import { useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { useApi } from '@/app/hooks/useApi';

import { SEARCH_PARAMETER } from '../constants';

export const useSearch = () => {
  const searchParameters = useSearchParams();

  const [search, setSearch] = useState(searchParameters.get(SEARCH_PARAMETER) || '');
  const [debouncedSearch] = useDebounce(search, 500);

  const { posts, setPosts, loading, apiError, getData } = useApi();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    if (debouncedSearch.trim()) {
      getData(signal, debouncedSearch);
    } else {
      setPosts([]);
    }

    return () => {
      controller.abort();
    };
  }, [debouncedSearch, getData, setPosts]);

  return { search, handleChange, posts, loading, apiError };
};
