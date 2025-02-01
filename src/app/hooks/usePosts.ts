import { useEffect } from 'react';

import { getAbortController } from '../utils/getAbortController';
import { useApi } from './useApi';

export const usePosts = () => {
  const { posts, loading, apiError, getData, postData } = useApi();

  const handleSubmit = async (name: string, text: string) => {
    await postData({ name, text, publishedAt: Date.now() });
    await getData();
  };

  useEffect(() => {
    const { controller, signal } = getAbortController();

    getData(signal);

    return () => {
      controller.abort();
    };
  }, [getData]);

  return { posts, loading, apiError, handleSubmit };
};
