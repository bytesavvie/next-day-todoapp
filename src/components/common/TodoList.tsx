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
        <div className='w-full h-full flex flex-col justify-start items-center p-4'>
          <Link href='/todos'>
            <a className='text-[3rem] lg:text-[5rem] md:text-[5rem] font-extrabold text-gray-700'>
              <span className='text-indigo-500'>Next</span> Day
            </a>
          </Link>
          <UserStatus />
          <div className='flex flex-row justify-center items-center w-full lg:w-3/4 md:w-full mt-4 '>
            <div className='flex flex-row justify-between items-center w-11/12 py-2 m-auto border-b-2 border-gray-300'>
              <h3 className='text-[2rem] lg:text-[3rem] md:text-[3rem] font-extrabold text-gray-700'>
                Task Lists:
              </h3>
              <NewList />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 mt-3 pt-3 w-full lg:w-3/4 md:w-full'>
            {todo_lists?.map(
              (todo_list) => (
                (count = 0),
                (duration = 0),
                (
                  <div className='flex flex-col justify-center items-center rounded shadow-sm hover:shadow-md border border-gray-300 h-fit w-11/12 p-1 m-auto'>
                    <Link href={`/todos/${todo_list.id}`} key={todo_list.id}>
                      <div className='bg-neutral-100 cursor-pointer flex flex-col justify-center items-start text-left h-full w-full p-6 pb-0 rounded'>
                        <h2 className='text-2xl text-gray-700 font-bold'>
                          {todo_list.name}
                        </h2>

                        <ul className='list-none list-inside divide-y-2 divide-dotted divide-indigo-400 w-full py-2'>
                          {todos?.map((todo) =>
                            todo.todoListsId === todo_list.id
                              ? (count++,
                                (duration += todo.duration),
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
                            <div className='flex flex-row justify-center text-xl text-gray-700 pt-2'>
                              <div className='font-bold'>
                                <span className='text-indigo-500'>Time:</span>{' '}
                                <span className='font-semibold'>
                                  {formatTotalDuration(duration)}
                                </span>
                              </div>
                            </div>
                          ) : null}
                        </ul>

                        {count === 0 ? (
                          <p className='pb-2'>The list is empty.</p>
                        ) : null}
                      </div>
                    </Link>
                    <div className='flex flex-row justify-between items-center h-full w-full p-1'>
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
          </div>
          <Link href='/'>
            <a className='text-base text-violet-600 underline decoration-dotted underline-offset-2 cursor-pointer py-4'>
              Go Home 🏠
            </a>
          </Link>
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
        <div className='w-screen h-screen flex flex-col justify-center items-center p-4'>
          <Link href='/todos'>
            <a className='text-[3rem] lg:text-[5rem] md:text-[5rem] font-extrabold text-gray-700'>
              <span className='text-indigo-500'>Next</span> Day
            </a>
          </Link>
          <UserStatus />
          <Link href='/'>
            <a className='text-base text-violet-600 underline decoration-dotted underline-offset-2 cursor-pointer py-4'>
              Go Home 🏠
            </a>
          </Link>
        </div>
      </div>
    )
  );
}

export default TodoList;
