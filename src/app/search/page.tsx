import clsx from 'clsx';
import { FC } from 'react';

const Search: FC = () => {
  return (
    <>
      <div className='w-1/3'>
        <div className='mt-2'>
          <form>
            <label className='mb-2 block text-sm font-medium' htmlFor='search'>
              Search:
              <input
                className={clsx(
                  'w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm',
                  'focus:border-indigo-500 focus:outline-none focus:ring-indigo-500',
                )}
                defaultValue='john'
                id='search'
                name='search'
                placeholder='Search...'
                type='text'
              />
            </label>
          </form>
        </div>
      </div>
      <section className='space-y-4'>
        <ul>
          <li>
            <div
              className={clsx(
                'my-3 flex items-start justify-between gap-5 rounded border border-stone-700 p-4',
              )}
            >
              <div className='flex-none'>
                <div className='flex-row'>
                  <div>
                    <strong>John Doe the First o...</strong>
                  </div>
                  <div>
                    <em>10. 2. 2024 - 21:17:41</em>
                  </div>
                </div>
              </div>
              <div className='flex-1'>
                <p className='overflow-hidden text-ellipsis'>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Duis condimentum augue
                  id magna semper rutrum. Pellentesque arcu. Etiam dictum tincidunt diam. In rutrum.
                  Morbi scelerisque luctus velit. Null...
                </p>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Search;
