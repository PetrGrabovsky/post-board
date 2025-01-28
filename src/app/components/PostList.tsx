import { FC } from 'react';

import { TPost } from '../types';
import { PostItem } from './PostItem';
import { Spinner } from './Spinner/Spinner';

interface IPostListProperties {
  posts: TPost[];
  isLoading?: boolean;
}

export const PostList: FC<IPostListProperties> = ({ posts, isLoading = false }) => {
  let result = <div className='text-gray-500'>No posts found</div>;

  if (isLoading) {
    result = <Spinner />;
  } else if (posts.length > 0 && !isLoading) {
    result = (
      <ul>
        {posts.map(({ id, name, publishedAt, text }) => (
          <PostItem
            key={id}
            hasExactDate={false}
            name={name}
            publishedAt={publishedAt}
            text={text}
          />
        ))}
      </ul>
    );
  }

  return <section className='space-y-4'>{result}</section>;
};
