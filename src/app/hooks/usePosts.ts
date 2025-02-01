import { useEffect } from 'react';

import { useApi } from './useApi';

export const usePosts = () => {
  const { posts, loading, apiError, getData, postData } = useApi();

  const handleSubmit = async (name: string, text: string) => {
    await postData({ name, text, publishedAt: Date.now() });
    await getData();
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    getData(signal);

    return () => {
      controller.abort();
    };
  }, [getData]);

  return { posts, loading, apiError, handleSubmit };
};
