import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
// import { ThinBackend } from 'thin-backend-react';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Next Day</title>
        <meta name='description' content='Create To Do list and manage it' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='w-full h-full sm:h-screen flex flex-col justify-center items-center px-0 py-4'>
        <Link
          href='/'
          className='text-[3rem] lg:text-[5rem] md:text-[5rem] font-extrabold text-gray-700'
        >
          <span className='text-indigo-500'>Next</span> Day
        </Link>
        <p className='text-2xl text-gray-700'>
          Crate a To Do list and get stuff done.
        </p>
        <div className='grid grid-cols-1 grid-rows-3 lg:grid-rows-1 md:grid-rows-1 lg:grid-cols-3 md:grid-cols-3 gap-2 w-full  md:w-full py-8 my-8 bg-indigo-100 lg:px-8 xl:px-56'>
          <div className='hover:shadow-xl duration-200 flex flex-col justify-center items-center text-center rounded shadow-md border border-gray-300 h-full w-11/12 p-6 m-auto bg-white'>
            <h2 className='text-xl text-gray-700 font-bold'>
              Start Your Day Here
            </h2>
            <p className='text-sm text-gray-600'>
              Next Day gives you focus, from work to play. Try it out today.
            </p>
            <Link href='/todos'>
              <button className='bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-6 rounded-full mt-3'>
                Get started
              </button>
            </Link>
          </div>
          <div className='hover:shadow-xl duration-200 flex flex-col justify-center items-center text-center rounded shadow-md border border-gray-300 h-full w-11/12 p-6 m-auto bg-white'>
            <h2 className='text-xl text-gray-700 font-bold'>To Do List</h2>
            <p className='text-sm text-gray-600'>
              Create a list of tasks for the day and get them done. You can add
              tasks, delete tasks, and mark tasks as done.
            </p>
            <Link
              href='/habits'
              className='text-sm text-violet-600 underline decoration-dotted underline-offset-2 cursor-pointer mt-3'
            >
              Read about making good habits
            </Link>
          </div>
          <div className='hover:shadow-xl duration-200 flex flex-col justify-center items-center text-center rounded  shadow-md border border-gray-300 h-full w-11/12 p-6 m-auto bg-white'>
            <h2 className='text-xl text-gray-700 font-bold'>Pomodoro</h2>
            <p className='text-sm text-gray-600'>
              A simple pomodoro technique used on every task in the List. Great
              for getting things done. Manage your time better.
            </p>
            <Link
              href='/pomodoro'
              className='text-sm text-violet-600 underline decoration-dotted underline-offset-2 cursor-pointer mt-3'
            >
              Read about Pomodoro technique
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
