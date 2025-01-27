'use client';

import clsx from 'clsx';
import { debounce } from 'lodash';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';

import { FormGroup } from '../components/FormGroup';
import { PostList } from '../components/PostList';
import { TPost } from '../types';
import { getUrl } from '../utils/getUrl';

const SEARCH_PARAMETER = 'term';
const SEARCH_ID = 'search';

const Search: FC = () => {
  const router = useRouter();
  const searchParameters = useSearchParams();

  const [posts, setPosts] = useState<TPost[]>([]);
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(searchParameters.get(SEARCH_PARAMETER) || '');

  const fetchPosts = async (term: string) => {
    if (!term.trim()) {
      setPosts([]);

      return;
    }

    setLoading(true);

    try {
      const response = await fetch(getUrl(term));

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = (await response.json()) as TPost[];
      setPosts(data);
    } catch (error) {
      setApiError(
        `Failed to fetch posts: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchPosts = useMemo(() => debounce(fetchPosts, 500), []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    debouncedFetchPosts(search);

    return () => {
      debouncedFetchPosts.cancel();
    };
  }, [search, debouncedFetchPosts]);

  useEffect(() => {
    const newParameters = new URLSearchParams(searchParameters.toString());
    newParameters.set(SEARCH_PARAMETER, search);

    router.replace(`?${newParameters.toString()}`);
  }, [search, searchParameters, router]);

  return (
    <>
      <title>{`Search ${search}`}</title>
      <div className='w-1/3'>
        <div className='mt-2'>
          <form>
            <FormGroup error={apiError} id={SEARCH_ID} label='Search'>
              <input
                className={clsx(
                  'w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm',
                  'focus:border-indigo-500 focus:outline-none focus:ring-indigo-500',
                )}
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
      {apiError && <div className='text-red-500'>{apiError}</div>}
      <section className='space-y-4'>
        {loading ? <div>Loading...</div> : posts.length > 0 && <PostList posts={posts} />}
      </section>
    </>
  );
};

export default Search;
