import clsx from 'clsx';
import { FC } from 'react';

const truncate = (text: string, length = 20) =>
  text.length > length ? `${text.slice(0, Math.max(0, length))}...` : text;

const formatDate = (date: Date) => `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;

interface IPostItemProperties {
  name: string;
  publishedAt: Date;
  text: string;
}

export const PostItem: FC<IPostItemProperties> = ({ name, publishedAt, text }) => {
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
              <em>{formatDate(publishedAt)}</em>
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
