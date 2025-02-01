'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { ErrorMessage } from '../components/ErrorMessage';
import { FormGroup } from '../components/FormGroup';
import { Input } from '../components/Input';
import { PostList } from '../components/PostList';
import { useApi } from '../hooks/useApi';

const SEARCH_PARAMETER = 'term';
const SEARCH_ID = 'search';

const Search: FC = () => {
  const router = useRouter();
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

  useEffect(() => {
    const parameters = new URLSearchParams({ [SEARCH_PARAMETER]: search });
    router.replace(`?${parameters.toString()}`);
  }, [search, router]);

  return (
    <>
      <title>{`Search ${search}`}</title>
      <div className='w-1/3'>
        <div className='mt-2'>
          <form>
            <FormGroup error={apiError} id={SEARCH_ID} label='Search'>
              <Input
                id={SEARCH_ID}
                name={SEARCH_ID}
                placeholder='Search...'
                type='text'
                value={search}
                onChange={handleChange}
              />
            </FormGroup>
          </form>
        </div>
      </div>
      {apiError && <ErrorMessage>{apiError}</ErrorMessage>}
      <PostList isLoading={loading} posts={posts} />
    </>
  );
};

export default Search;
