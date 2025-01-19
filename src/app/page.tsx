'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { FC, useActionState, useState } from 'react';

import { FormGroup } from './components/FormGroup';
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

const DEFAULT_FORM_STATE = { name: '', text: '', errors: { name: '', text: '' } };

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

const Home: FC = () => {
  const [posts, setPosts] = useState<TPost[]>(data);
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
            <FormGroup error={nameError} id='name' label='Your name'>
              <input
                className={clsx(
                  'w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm',
                  'focus:outline-none focus:ring-indigo-500',
                )}
                defaultValue={nameValue}
                id='name'
                name='name'
                placeholder='Your name'
                type='text'
              />
            </FormGroup>
            <FormGroup error={textError} id='text' label='Your post'>
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
            </FormGroup>
          </div>
          <div className='mt-2'>
            <button className='w-fit bg-green-600 px-6 py-3 font-bold text-white' type='submit'>
              Submit
            </button>
          </div>
        </form>
        <section className='space-y-4'>
          <PostList posts={posts} />
        </section>
      </section>
    </>
  );
};

export default Home;
