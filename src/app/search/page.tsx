'use client';

import { FC } from 'react';

import { PostList } from '../components/PostList';
import { SearchForm } from './components/SearchForm';
import { useSearch } from './hooks/useSearch';

const Search: FC = () => {
  const { search, handleChange, posts, loading, apiError } = useSearch();

  return (
    <>
      <title>{`Search ${search}`}</title>
      <SearchForm apiError={apiError} value={search} onChange={handleChange} />
      <PostList isLoading={loading} posts={posts} />
    </>
  );
};

export default Search;
