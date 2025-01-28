'use client';

import { FC, useEffect } from 'react';

import { PostForm } from './components/PostForm';
import { PostList } from './components/PostList';
import { useApi } from './hooks/useApi';

const Posts: FC = () => {
  const { posts, loading, apiError, getData, postData } = useApi();

  const handleSubmit = async (name: string, text: string) => {
    await postData({ name, text, publishedAt: Date.now() });
    await getData();
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <title>{`Posts - ${posts.length > 0 ? `See ${posts.length} posts` : 'No posts'}`}</title>
      <PostForm apiError={apiError} onSubmit={handleSubmit} />
      <PostList isLoading={loading} posts={posts} />
    </>
  );
};

export default Posts;
