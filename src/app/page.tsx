import clsx from 'clsx';
import Link from 'next/link';

const Home = () => {
  return (
    <>
      <nav className='flex h-20 items-center justify-start bg-red-950 px-8 py-3'>
        <ul className='flex'>
          <li className='mr-6'>
            <Link
              aria-current='page'
              className='font-bold text-white underline hover:underline'
              href='/'
            >
              Posts
            </Link>
          </li>
          <li className='mr-6'>
            <a className='font-bold text-white hover:underline' href='/search'>
              Search
            </a>
          </li>
        </ul>
      </nav>
      <section className='container mx-auto flex flex-col space-y-4 px-4 py-3 text-left'>
        <form>
          <div>
            <div className='mt-2'>
              <label className='mb-2 block text-sm font-medium' htmlFor='name'>
                Your name:
                <input
                  className={clsx(
                    'w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm',
                    'focus:border-indigo-500 focus:outline-none focus:ring-indigo-500',
                  )}
                  id='name'
                  name='name'
                  placeholder='Your name'
                  type='text'
                />
              </label>
            </div>
            <div className='mt-2'>
              <label className='mb-2 block text-sm font-medium' htmlFor='text'>
                Your post:
                <textarea
                  className={clsx(
                    'w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm',
                    'focus:border-indigo-500 focus:outline-none focus:ring-indigo-500',
                  )}
                  id='text'
                  name='text'
                  placeholder='Some post'
                  rows={4}
                />
              </label>
            </div>
          </div>
          <div className='mt-2'>
            <button className='w-fit bg-green-600 px-6 py-3 font-bold text-white' type='submit'>
              Submit
            </button>
          </div>
        </form>
        <section className='space-y-4'>
          <ul>
            <li>
              <div
                className={clsx(
                  'my-3 flex items-start justify-between gap-5 rounded border border-stone-700',
                  'p-4',
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
                    id magna semper rutrum. Pellentesque arcu. Etiam dictum tincidunt diam. In
                    rutrum. Morbi scelerisque luctus velit. Null...
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </section>
    </>
  );
};

export default Home;
