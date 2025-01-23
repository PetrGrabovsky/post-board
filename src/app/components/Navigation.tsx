import Link from 'next/link';
import { FC } from 'react';

export const Navigation: FC = () => {
  return (
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
  );
};
