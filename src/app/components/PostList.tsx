import { FC } from 'react';

import { TPost } from '../types';
import { PostItem } from './PostItem';

interface IPostListProperties {
  posts: TPost[];
}

export const PostList: FC<IPostListProperties> = ({ posts }) => {
  return (
    <ul>
      {posts.map(({ id, name, publishedAt, text }) => (
        <PostItem key={id} name={name} publishedAt={publishedAt} text={text} />
      ))}
    </ul>
  );
};
