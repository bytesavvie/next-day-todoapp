import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Habits: NextPage = () => {
  return (
    <div className='w-full h-screen flex flex-col justify-start items-center p-4'>
      <Head>
        <title>Making Good Habits</title>
        <meta name='description' content='About making good habits' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Link href='/'>
        <a className='text-[3rem] lg:text-[5rem] md:text-[5rem] font-extrabold text-gray-700'>
          <span className='text-indigo-300'>Next</span> Day
        </a>
      </Link>
      <h3 className='text-[1.75rem] lg:text-[2rem] md:text-[2rem] font-extrabold text-gray-700 w-full lg:w-2/3 md:w-full pt-8'>
        Making Good Habits
      </h3>
      {/* Text about making good habits */}
      <p className='text-lg text-gray-500 w-full lg:w-2/3 md:w-full'>
        <strong>
          5 Habits That Will Help You Achieve Your Goals, According to Research
          Introduction: What are Habits and Why are they Important to our
          Success?
        </strong>
        <br />
        <strong>1)</strong> Practice One Habit at a Time
        <br />
        <strong>2)</strong> Increase the Frequency for Rhythmical Habits
        <br />
        <strong>3)</strong> Form Habits around Positive Reinforcement or Rewards
        <br />
        <strong>4)</strong> Avoid Temptation by Setting a Boundary or Limit for
        Yourself
        <br />
        <strong>5)</strong> Ensure that You have Clear Goals in Place with
        Specific Actions Required for Successful Habit Formation
      </p>
      <h4 className='text-2xl font-extrabold text-gray-700 w-full lg:w-2/3 md:w-full'>
        Practice One Habit at a Time
      </h4>
      <p className='text-lg text-gray-500 w-full lg:w-2/3 md:w-full'>
        If you&apos;re looking for a way to make the most out of your day, try
        focusing on one habit at a time. This will help you focus on one thing
        at a time and not overwhelm yourself. You can also break down habits
        into smaller, more manageable tasks. For instance, if you want to stop
        biting your nails, start by painting them with clear nail polish.
      </p>
      <h4 className='text-2xl font-extrabold text-gray-700 w-full lg:w-2/3 md:w-full'>
        Increase the Frequency for Rhythmical Habits
      </h4>
      <p className='text-lg text-gray-500 w-full lg:w-2/3 md:w-full'>
        The best way to develop a habit is to make it part of your routine.
        Studies show that the best time to practice a new habit is when you are
        already in the process of doing something else. For example, if you want
        to start flossing every day, add it as part of your morning routine. You
        can put your toothbrush and toothpaste next to the sink so that you
        don&apos; forget or have an excuse not to do it. You can also set a
        timer on your phone so that you know exactly how long you need to be
        practicing for. As a result, this will make flossing more likely because
        it&apos;s already part of what you&apos;re doing every day and
        doesn&apos;t require any additional effort.
      </p>
      <h4 className='text-2xl font-extrabold text-gray-700 w-full lg:w-2/3 md:w-full'>
        Form Habits around Positive Reinforcement or Rewards
      </h4>
      <p className='text-lg text-gray-500 w-full lg:w-2/3 md:w-full'>
        There are two types of habits: positive and negative. The best way to
        make a habit is to use positive reinforcement or rewards. Positive
        reinforcement is when you reward yourself for doing the behavior, like
        if you go to the gym and work out then you can treat yourself to a nice
        dinner. Negative reinforcement is when you punish yourself for not doing
        the behavior, like if you don&apos;t go to the gym then you can&apos;t
        watch your favorite TV show.
      </p>
      <h4 className='text-2xl font-extrabold text-gray-700 w-full lg:w-2/3 md:w-full'>
        Avoid Temptation by Setting a Boundary or Limit for Yourself
      </h4>
      <p className='text-lg text-gray-500 w-full lg:w-2/3 md:w-full'>
        It is always important to set a boundary or limit for yourself. This
        way, you can avoid temptation and make sure that you are practicing good
        habits. Some people find it difficult to make good habits and practice
        them every day. It is always important to set a boundary or limit so
        that you don&apos;t have any temptations in your life. For example, if
        someone wants to exercise every day, they should make sure that they
        have time for it in their schedule.
      </p>
      <h4 className='text-2xl font-extrabold text-gray-700 w-full lg:w-2/3 md:w-full'>
        Ensure that You have Clear Goals in Place with Specific Actions Required
        for Successful Habit Formation
      </h4>
      <p className='text-lg text-gray-500 w-full lg:w-2/3 md:w-full'>
        We all have habits that we would like to form or break. But it can be
        difficult to do so. That&apos;s why you should take the time to set
        clear goals and make a plan of action. It&apos;s important to know what
        your goal is, what steps you need to take, and when you need to take
        them in order for your habit formation process to be successful.
      </p>

      <Link href='/'>
        <a className='text-sm text-violet-500 underline decoration-dotted underline-offset-2 cursor-pointer mt-3'>
          Go Home 🏠
        </a>
      </Link>
    </div>
  );
};

export default Habits;
