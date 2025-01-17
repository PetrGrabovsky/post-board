'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { FormEvent, useRef, useState } from 'react';

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

const DEFAULT_ERRORS = { name: '', text: '' };

const truncate = (text: string, length = 20) =>
  text.length > length ? `${text.slice(0, Math.max(0, length))}...` : text;

const formatDate = (date: Date) => `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;

const validateForm = (name: string, text: string) => {
  const errors = { ...DEFAULT_ERRORS };

  if (name.trim().length === 0) {
    errors.name = 'Name is required';
  } else if (name.trim().length < 3) {
    errors.name = 'Name must be at least 3 characters long';
  }

  if (text.trim().length === 0) {
    errors.text = 'Text is required';
  } else if (text.trim().length < 3) {
    errors.text = 'Text must be at least 3 characters long';
  }

  return errors;
};

const Home = () => {
  const [posts, setPosts] = useState(data);
  const [errors, setErrors] = useState({ ...DEFAULT_ERRORS });

  const inputReference = useRef<HTMLInputElement>(null);
  const textAreaReference = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = inputReference.current?.value || '';
    const text = textAreaReference.current?.value || '';

    const validatedErrors = validateForm(name, text);

    if (validatedErrors.name || validatedErrors.text) {
      setErrors(validatedErrors);

      return;
    }

    setPosts((currentPosts) => [
      { id: posts.length + 1, name, text, publishedAt: new Date() },
      ...currentPosts,
    ]);

    setErrors({ ...DEFAULT_ERRORS });

    inputReference.current!.value = '';
    textAreaReference.current!.value = '';
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
        <form onSubmit={handleSubmit}>
          <div>
            <div className='mt-2'>
              <label className='mb-2 block text-sm font-medium' htmlFor='name'>
                Your name:
                <input
                  ref={inputReference}
                  className={clsx(
                    'w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm',
                    'focus:border-indigo-500 focus:outline-none focus:ring-indigo-500',
                  )}
                  id='name'
                  name='name'
                  placeholder='Your name'
                  type='text'
                />
              </label>
              <div className='text-red-500'>{errors.name}</div>
            </div>
            <div className='mt-2'>
              <label className='mb-2 block text-sm font-medium' htmlFor='text'>
                Your post:
                <textarea
                  ref={textAreaReference}
                  className={clsx(
                    'w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm',
                    'focus:border-indigo-500 focus:outline-none focus:ring-indigo-500',
                  )}
                  id='text'
                  name='text'
                  placeholder='Some post'
                  rows={4}
                />
              </label>
              <div className='text-red-500'>{errors.text}</div>
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
            {posts.map(({ id, name: author, publishedAt, text: content }) => (
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
                        <em>{formatDate(publishedAt)}</em>
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
