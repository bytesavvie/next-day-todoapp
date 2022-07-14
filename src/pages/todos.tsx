import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ThinBackend } from 'thin-backend-react';

import UserStatus from '../components/common/UserStatus';

const Todos: NextPage = () => {
  return (
    <ThinBackend>
      <Head>
        <title>Next ToDo App</title>
        <meta name='description' content='Create ToDo list and manage it' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='w-screen h-screen flex flex-col justify-center items-center p-4'>
        <h2 className='text-[3rem] lg:text-[5rem] md:text-[5rem] font-extrabold text-gray-700'>
          <span className='text-purple-300'>ToDo</span> Next
        </h2>
        <UserStatus />
        <Link href='/'>
          <a className='text-sm text-violet-500 underline decoration-dotted underline-offset-2 cursor-pointer mt-3'>
            Go Home 🏠
          </a>
        </Link>
      </div>
    </ThinBackend>
  );
};

export default Todos;
