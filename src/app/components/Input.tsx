import clsx from 'clsx';
import { AllHTMLAttributes, FC } from 'react';

import { EInputVariant } from '../enums';

interface IInputProperties extends AllHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  variant?: EInputVariant;
}

export const Input: FC<IInputProperties> = ({
  variant: Tag = EInputVariant.INPUT,
  className = '',
  ...rest
}) => {
  return (
    <Tag
      className={clsx(
        'w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:outline-none',
        'focus:ring-indigo-500',
        className,
      )}
      {...rest}
    />
  );
};
