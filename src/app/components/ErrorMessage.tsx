import { FC, ReactNode } from 'react';

interface IErrorMessageProperties {
  children: ReactNode;
}

export const ErrorMessage: FC<IErrorMessageProperties> = ({ children }) => {
  return <div className='text-red-500'>{children}</div>;
};
