'use client';

import { FC, useEffect, useState } from 'react';

import { PostForm } from './components/PostForm';
import { PostList } from './components/PostList';
import { TPost } from './types';
import { getUrl } from './utils/getUrl';

const addPost = async (name: string, text: string) =>
  await fetch(getUrl(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, text, publishedAt: Date.now() }),
  });

const Posts: FC = () => {
  const [posts, setPosts] = useState<TPost[]>([]);
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch(getUrl());

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

  const handleSubmit = async (name: string, text: string) => {
    try {
      const response = await addPost(name, text);

      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (error) {
      setApiError(
        `Failed to add post: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );

      throw error;
    }
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <title>{`Posts - ${posts.length > 0 ? `See ${posts.length} posts` : 'No posts'}`}</title>
      <PostForm apiError={apiError} onSubmit={handleSubmit} />
      <section className='space-y-4'>
        {loading ? <div>Loading...</div> : posts.length > 0 && <PostList posts={posts} />}
      </section>
    </>
  );
};

export default Posts;
