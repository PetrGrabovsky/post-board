'use client';

import Link from 'next/link';
import { FC, useState } from 'react';

import { PostForm } from './components/PostForm';
import { PostList } from './components/PostList';
import { TPost } from './types';

const data = [
  {
    id: 1,
    name: 'John Doe',
    publishedAt: new Date(),
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi accusamus incidunt
      quos eius reprehenderit. Consequatur accusamus et commodi aut enim nobis, est accusantium
      ratione necessitatibus expedita eveniet? Cumque, numquam quae?`,
  },
  {
    id: 2,
    name: 'John Doe',
    publishedAt: new Date(),
    text: 'Foo',
  },
];

const Home: FC = () => {
  const [posts, setPosts] = useState<TPost[]>(data);

  const handleSubmit = (name: string, text: string) => {
    setPosts((currentPosts) => [
      { id: currentPosts.length + 1, name, text, publishedAt: new Date() },
      ...currentPosts,
    ]);
  };

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
