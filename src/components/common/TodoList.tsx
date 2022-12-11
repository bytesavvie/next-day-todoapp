import Head from 'next/head';
import Link from 'next/link';
import { query } from 'thin-backend';
import { useQuery, useIsLoggedIn } from 'thin-backend-react';
import DeleteList from './DeleteList';
import EditList from './EditList';
import NewList from './NewList';
import PlayPomo from './PlayPomo';
import ResetPomo from './ResestPomo';
import UserStatus from './UserStatus';
import GoHomeBtn from './GoHomeBtn';
import LogoHomeBtn from './LogoHomeBtn';

function TodoList() {
  const todo_lists = useQuery(query('todo_lists').orderByAsc('createdAt'));
  const todos = useQuery(query('todos').orderByAsc('createdAt'));

  const isLoggedIn = useIsLoggedIn();

  if (isLoggedIn && todo_lists == null) {
    return <p>Loading...</p>;
  }

  if (isLoggedIn && todos == null) {
    return <p>Loading...</p>;
  }

  let count = 0;

  let duration = 0;

  // if duration >= 60 return 'hh:mm hrs' with leading zero else return 'mm:ss min' with leading zero
  const formatTotalDuration = (totalDuration: number) => {
    if (totalDuration >= 60) {
      const hours = Math.floor(totalDuration / 60);
      const minutes = totalDuration % 60;
      if (hours === 1) {
        return `${hours < 10 ? `0${hours}` : hours}:${
          minutes < 10 ? `0${minutes}` : minutes
        } hr`;
      } else {
        return `${hours < 10 ? `0${hours}` : hours}:${
          minutes < 10 ? `0${minutes}` : minutes
        } hrs`;
      }
    } else {
      const minutes = Math.floor(totalDuration / 60);
      const seconds = totalDuration % 60;
      return `${minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds
      } min`;
    }
  };

  return (
    (isLoggedIn && (
      <div>
        <Head>
          <title>Next Day | Lists</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <div className='flex flex-col items-center justify-between w-full h-full min-h-screen p-4'>
          <Link
            href='/todos'
            className='text-[3rem] lg:text-[5rem] md:text-[5rem] font-extrabold text-gray-700'
          >
            <span className='text-indigo-500'>Next</span> Day
          </Link>
          <UserStatus />

          <div className='flex flex-row items-center justify-center w-full px-8 py-4 sm:px-32 xl:px-64'>
            <div className='flex flex-row items-center justify-between w-full border-b-2 border-gray-300'>
              <h3 className='text-[2rem] lg:text-[3rem] md:text-[3rem] font-extrabold text-gray-700'>
                Task Lists:
              </h3>
              <NewList />
            </div>
          </div>

          <div className='grid w-full grid-cols-1 gap-3 px-8 pt-3 mt-3 sm:px-32 xl:px-64 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 md:w-full'>
            {todo_lists?.map(
              (todo_list) => (
                count++,
                (duration = 0),
                (
                  <div className='flex flex-col items-center justify-center w-full p-1 m-auto border border-gray-300 rounded shadow-sm hover:shadow-md h-fit'>
                    <Link
                      href={`/todos/${todo_list.id}`}
                      key={todo_list.id}
                      className='flex flex-col items-start justify-center w-full h-full p-6 pb-0 text-left rounded cursor-pointer bg-neutral-100'
                    >
                      <h2 className='text-2xl font-bold text-gray-700'>
                        {todo_list.name}
                      </h2>

                      <ul className='w-full py-2 list-none list-inside divide-y-2 divide-indigo-400 divide-dotted'>
                        {todos?.map((todo) =>
                          todo.todoListsId === todo_list.id
                            ? ((duration += todo.duration),
                              (
                                <li
                                  className='flex flex-row justify-between py-1'
                                  key={todo.id}
                                >
                                  <div>
                                    {todo.isCompleted ? '✅' : '❌'}{' '}
                                    <span className='font-semibold'>
                                      {todo.name}
                                    </span>
                                  </div>
                                  <div className='font-semibold'>
                                    {todo.duration} min
                                  </div>
                                </li>
                              ))
                            : null
                        )}
                        {duration > 0 ? (
                          <div className='flex flex-row justify-center pt-2 text-xl text-gray-700'>
                            <div className='font-bold'>
                              <span className='text-indigo-500'>Time:</span>{' '}
                              <span className='font-semibold'>
                                {formatTotalDuration(duration)}
                              </span>
                            </div>
                          </div>
                        ) : null}
                      </ul>
                    </Link>
                    <div className='flex flex-row items-center justify-between w-full h-full p-1'>
                      <div className='flex flex-row justify-start gap-2'>
                        <PlayPomo id={todo_list.id} count={count} />
                        <ResetPomo id={todo_list.id} />
                      </div>
                      <div className='flex flex-row justify-end gap-2'>
                        <EditList
                          id={todo_list.id}
                          name={todo_list.name.replace(/ /g, '\u00a0')}
                        />
                        <DeleteList listId={todo_list.id} />
                      </div>
                    </div>
                  </div>
                )
              )
            )}
            {count === 0 ? (
              <p className='col-span-3 pb-2 text-center'>The list is empty.</p>
            ) : null}
          </div>
          <GoHomeBtn />
        </div>
      </div>
    )) || (
      <div>
        <Head>
          <title>Next Day</title>
          <meta
            name='description'
            content='Create and manage your todo lists.'
          />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <div className='flex flex-col items-center justify-center w-screen h-screen p-4'>
          <LogoHomeBtn />
          <UserStatus />
        </div>
      </div>
    )
  );
}

export default TodoList;
