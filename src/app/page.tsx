'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useActionState, useState } from 'react';

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

const DEFAULT_FORM_STATE = { name: '', text: '', errors: { name: '', text: '' } };

const truncate = (text: string, length = 20) =>
  text.length > length ? `${text.slice(0, Math.max(0, length))}...` : text;

const formatDate = (date: Date) => `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;

const validateForm = (name: string, text: string) => {
  const errors = { ...DEFAULT_FORM_STATE.errors };

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
  const [state, submitAction] = useActionState<
    { name: string; text: string; errors: { name: string; text: string } },
    FormData
  >(
    (_, payload) => {
      const name = payload.get('name') as string;
      const text = payload.get('text') as string;

      const errors = validateForm(name, text);

      if (errors.name || errors.text) {
        return { text, name, errors };
      }

      setPosts((currentPosts) => [
        { id: currentPosts.length + 1, name, text, publishedAt: new Date() },
        ...currentPosts,
      ]);

      return { ...DEFAULT_FORM_STATE };
    },
    { ...DEFAULT_FORM_STATE },
  );

  const {
    errors: { name: nameError, text: textError },
    name: nameValue,
    text: textValue,
  } = state;

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
        <form action={submitAction}>
          <div>
            <div className='mt-2'>
              <label className='mb-2 block text-sm font-medium' htmlFor='name'>
                Your name:
                <input
                  className={clsx(
                    'w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm',
                    'focus:border-indigo-500 focus:outline-none focus:ring-indigo-500',
                  )}
                  defaultValue={nameValue}
                  id='name'
                  name='name'
                  placeholder='Your name'
                  type='text'
                />
              </label>
              <div className='text-red-500'>{nameError}</div>
            </div>
            <div className='mt-2'>
              <label className='mb-2 block text-sm font-medium' htmlFor='text'>
                Your post:
                <textarea
                  className={clsx(
                    'w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm',
                    'focus:border-indigo-500 focus:outline-none focus:ring-indigo-500',
                  )}
                  defaultValue={textValue}
                  id='text'
                  name='text'
                  placeholder='Some post'
                  rows={4}
                />
              </label>
              <div className='text-red-500'>{textError}</div>
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
