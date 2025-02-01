'use client';

import { useSearchParams } from 'next/navigation';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { PostList } from '../components/PostList';
import { useApi } from '../hooks/useApi';
import { SearchForm } from './components/SearchForm';
import { SEARCH_PARAMETER } from './constants';

const Search: FC = () => {
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
      getData(debouncedSearch, signal);
    } else {
      setPosts([]);
    }

    return () => {
      controller.abort();
    };
  }, [debouncedSearch, getData, setPosts]);

  return (
    <>
      <title>{`Search ${search}`}</title>
      <SearchForm apiError={apiError} value={search} onChange={handleChange} />
      <PostList isLoading={loading} posts={posts} />
    </>
  );
};

export default Search;
