import './globals.css';

import { PropsWithChildren } from 'react';

import { Navigation } from './components/Navigation';

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang='cs'>
      <title>Post App</title>
      <meta content='A simple app.' name='description' />
      <link href='https://github.com/PetrGrabovsky' rel='author' />
      <body>
        <Navigation />
        <section className='container mx-auto flex flex-col space-y-4 px-4 py-3 text-left'>
          {children}
        </section>
      </body>
    </html>
  );
};

export default RootLayout;
