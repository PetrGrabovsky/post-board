import clsx from 'clsx';
import { FC } from 'react';

import { TPost } from '../types';

const truncate = (text: string, length = 20) =>
  text.length > length ? `${text.slice(0, Math.max(0, length))}...` : text;

const formatDate = (date: Date, hasExactDate: boolean) =>
  hasExactDate
    ? `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`
    : date.toLocaleDateString();

interface IPostItemProperties {
  name: TPost['name'];
  publishedAt: TPost['publishedAt'];
  text: TPost['text'];
  hasExactDate?: boolean;
}

export const PostItem: FC<IPostItemProperties> = ({
  name,
  publishedAt,
  text,
  hasExactDate = true,
}) => {
  return (
    <li>
      <div
        className={clsx(
          'my-3 flex items-start justify-between gap-5 rounded border border-stone-700 p-4',
        )}
      >
        <div className='w-32 flex-none'>
          <div className='flex-row'>
            <div>
              <strong>{truncate(name)}</strong>
            </div>
            <div>
              <em>{formatDate(publishedAt, hasExactDate)}</em>
            </div>
          </div>
        </div>
        <div className='flex-1'>
          <p className='overflow-hidden text-ellipsis'>{truncate(text, 200)}</p>
        </div>
      </div>
    </li>
  );
};
