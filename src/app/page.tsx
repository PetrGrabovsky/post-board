'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';

const data = [
  {
    id: 1,
    name: 'John Doe',
    publishedAt: '2024-01-01',
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi accusamus incidunt
      quos eius reprehenderit. Consequatur accusamus et commodi aut enim nobis, est accusantium
      ratione necessitatibus expedita eveniet? Cumque, numquam quae?`,
  },
  {
    id: 2,
    name: 'John Doe',
    publishedAt: '2024-01-02',
    text: 'Foo',
  },
];

const truncate = (text: string, length = 20) =>
  text.length > length ? `${text.slice(0, Math.max(0, length))}...` : text;

const Home = () => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');

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
        <form>
          <div>
            <div className='mt-2'>
              <label className='mb-2 block text-sm font-medium' htmlFor='name'>
                Your name:
                <input
                  className={clsx(
                    'w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm',
                    'focus:border-indigo-500 focus:outline-none focus:ring-indigo-500',
                  )}
                  id='name'
                  name='name'
                  placeholder='Your name'
                  type='text'
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </label>
            </div>
            <div className='mt-2'>
              <label className='mb-2 block text-sm font-medium' htmlFor='text'>
                Your post:
                <textarea
                  className={clsx(
                    'w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm',
                    'focus:border-indigo-500 focus:outline-none focus:ring-indigo-500',
                  )}
                  id='text'
                  name='text'
                  placeholder='Some post'
                  rows={4}
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                />
              </label>
            </div>
          </div>
          <div className='mt-2'>
            <button className='w-fit bg-green-600 px-6 py-3 font-bold text-white' type='submit'>
              Submit
            </button>
          </div>
        </form>
        <section className='space-y-4'>
          <ul>
            {data.map(({ id, name: author, publishedAt, text: content }) => (
              <li key={id}>
                <div
                  className={clsx(
                    'my-3 flex items-start justify-between gap-5 rounded border border-stone-700',
                    'p-4',
                  )}
                >
                  <div className='w-32 flex-none'>
                    <div className='flex-row'>
                      <div>
                        <strong>{truncate(author)}</strong>
                      </div>
                      <div>
                        <em>{publishedAt}</em>
                      </div>
                    </div>
                  </div>
                  <div className='flex-1'>
                    <p className='overflow-hidden text-ellipsis'>{truncate(content, 200)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </>
  );
};

export default Home;
