'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, ReactNode } from 'react';

interface INavItemProperties {
  children: ReactNode;
  href: string;
}

export const NavItem: FC<INavItemProperties> = ({ children, href }) => {
  const pathName = usePathname();
  const isActive = pathName === href;

  return (
    <li className='mr-6'>
      <Link
        aria-current={isActive ? 'page' : undefined}
        className={clsx('font-bold text-white hover:underline', isActive && 'underline')}
        href={href}
      >
        {children}
      </Link>
    </li>
  );
};
