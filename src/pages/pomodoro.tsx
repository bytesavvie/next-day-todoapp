import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Pomodoro: NextPage = () => {
  return (
    <div className='w-full h-screen flex flex-col justify-start items-center p-4'>
      <Head>
        <title>Pomodoro Technique</title>
        <meta name='description' content='About Pomodoro Technique' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Link href='/'>
        <a className='text-[3rem] lg:text-[5rem] md:text-[5rem] font-extrabold text-gray-700'>
          <span className='text-indigo-500'>Next</span> Day
        </a>
      </Link>
      <h3 className='text-[1.75rem] lg:text-[2rem] md:text-[2rem] font-extrabold text-gray-700 w-full lg:w-2/3 md:w-full pt-8'>
        Pomodoro Technique
      </h3>
      <p className='text-lg text-gray-500 w-full lg:w-2/3 md:w-full'>
        Pomodoro technique is a time management method developed by Francesco
        Cirillo in the late 1980s. The technique is named after the Italian word
        for &quot;tomato&quot; (pomodoro), as a timer is typically used to keep
        track of the work intervals. The Pomodoro Technique is based on the idea
        that it is easier to sustain focus for short periods of time, and that
        taking regular breaks can help to improve overall productivity. The
        technique involves working for 25 minutes, followed by a 5-minute break.
        This cycle is repeated 4 times, after which a longer break of 15-20
        minutes is taken. There are a number of different ways to use the
        Pomodoro Technique, and it can be customized to fit each person&apos;s
        needs. There are also a number of different tools and apps that can be
        used to help with time.
      </p>
      <h3 className='text-[1.75rem] lg:text-[2rem] md:text-[2rem] font-extrabold text-gray-700 w-full lg:w-2/3 md:w-full'>
        Step by Step Guide
      </h3>
      <ol className='text-lg text-gray-500 w-full lg:w-2/3 md:w-full'>
        <li className='mb-2'>
          <strong>Start</strong> a timer for 25 minutes.
        </li>
        <li className='mb-2'>
          <strong>Take a break</strong> for 5 to 15 minutes.
        </li>
        <li className='mb-2'>
          <strong>Repeat until you complete</strong> your set goal of intervals.
        </li>
        <li className='mb-2'>
          <strong>Take a longer break</strong> for 15 to 30 minutes.
        </li>
      </ol>
      <Link href='/'>
        <a className='text-base text-violet-600 underline decoration-dotted underline-offset-2 cursor-pointer py-4'>
          Go Home 🏠
        </a>
      </Link>
    </div>
  );
};

export default Pomodoro;
