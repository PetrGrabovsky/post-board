import clsx from 'clsx';
import { FC, ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

interface ISubmitButtonProperties {
  children: ReactNode;
}

export const SubmitButton: FC<ISubmitButtonProperties> = ({ children }) => {
  const { pending } = useFormStatus();

  return (
    <button
      className={clsx(
        'w-fit px-6 py-3 font-bold text-white',
        pending ? 'bg-gray-400' : 'bg-green-600',
      )}
      disabled={pending}
      type='submit'
    >
      {children}
    </button>
  );
};
