'use client';

import { FC } from 'react';

import { PostForm } from './components/PostForm';
import { PostList } from './components/PostList';
import { usePosts } from './hooks/usePosts';

const Posts: FC = () => {
  const { posts, loading, apiError, handleSubmit } = usePosts();

  return (
    <>
      <title>{`Posts - ${posts.length > 0 ? `See ${posts.length} posts` : 'No posts'}`}</title>
      <PostForm apiError={apiError} onSubmit={handleSubmit} />
      <PostList isLoading={loading} posts={posts} />
    </>
  );
};

export default Posts;
