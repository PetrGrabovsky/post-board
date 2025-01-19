import { FC, ReactNode } from 'react';

interface IFormGroupProperties {
  id: string;
  label: string;
  children: ReactNode;
  error: string;
}

export const FormGroup: FC<IFormGroupProperties> = ({ id, label, children, error }) => {
  return (
    <div className='mt-2'>
      <label className='mb-2 block text-sm font-medium' htmlFor={id}>
        {label}
        {children}
      </label>
      <div className='text-red-500'>{error}</div>
    </div>
  );
};
