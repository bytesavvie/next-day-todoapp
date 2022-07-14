import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ThinBackend } from 'thin-backend-react';
import TodoList from '../components/common/TodoList';

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
        <Link href='/todos'>
          <a className='text-[3rem] lg:text-[5rem] md:text-[5rem] font-extrabold text-gray-700'>
            <span className='text-purple-300'>Next</span> Day
          </a>
        </Link>
        <UserStatus />
        <h3 className='text-[2rem] lg:text-[3rem] md:text-[3rem] font-extrabold text-gray-700 w-full lg:w-2/3 md:w-full'>
          Task Lists:
        </h3>
        <TodoList />
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
