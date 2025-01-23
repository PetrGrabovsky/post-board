import { FC } from 'react';

import { NavItem } from './NavItem';

export const Navigation: FC = () => {
  return (
    <nav className='flex h-20 items-center justify-start bg-red-950 px-8 py-3'>
      <ul className='flex'>
        <NavItem href='/'>Posts</NavItem>
        <NavItem href='/search'>Search</NavItem>
      </ul>
    </nav>
  );
};
