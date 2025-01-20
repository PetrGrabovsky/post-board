'use client';

import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

import { PostForm } from './components/PostForm';
import { PostList } from './components/PostList';
import { TPost } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

const handleSubmit = async (name: string, text: string) => {
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, text, publishedAt: Date.now() }),
  });
};

const Home: FC = () => {
  const [posts, setPosts] = useState<TPost[]>([]);

  const fetchPosts = async () => {
    const response = await fetch(API_URL);
    const data = (await response.json()) as TPost[];
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <nav className='flex h-20 items-center justify-start bg-red-950 px-8 py-3'>
        <ul className='flex'>
          <li className='mr-6'>
            <Link
              aria-current='page'
              className='font-bold text-white underline hover:underline'
              href='/'
            >
              Posts
            </Link>
          </li>
          <li className='mr-6'>
            <a className='font-bold text-white hover:underline' href='/search'>
              Search
            </a>
          </li>
        </ul>
      </nav>
      <section className='container mx-auto flex flex-col space-y-4 px-4 py-3 text-left'>
        <PostForm onSubmit={handleSubmit} />
        <section className='space-y-4'>{posts.length > 0 && <PostList posts={posts} />}</section>
      </section>
    </>
  );
};

export default Home;
