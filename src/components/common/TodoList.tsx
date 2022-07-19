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
          <h3 className='text-[2rem] lg:text-[3rem] md:text-[3rem] font-extrabold text-gray-700 w-full lg:w-2/3 '>
            Task Lists:
          </h3>

          <div className='grid grid-cols-1 grid-rows-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 mt-3 pt-3 w-full lg:w-3/4 md:w-full'>
            {todo_lists?.map(
              (todo_list) => (
                (count = 0),
                (
                  <div className='flex flex-col justify-center items-center rounded shadow-xl border-2 border-gray-500 h-full w-11/12 p-1 m-auto'>
                    <Link href={`/todos/${todo_list.id}`} key={todo_list.id}>
                      <div className='bg-slate-100 cursor-pointer flex flex-col justify-center items-start text-left h-full w-full p-6 rounded'>
                        <h2 className='text-2xl text-gray-700 font-bold'>
                          {todo_list.name}
                        </h2>

                        <ul className='list-none list-inside divide-y-2 divide-dotted divide-indigo-400 w-full py-2'>
                          {todos?.map((todo) =>
                            todo.todoListsId === todo_list.id
                              ? (count++,
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
                        </ul>
                        {count === 0 ? <p>The list is empty.</p> : null}
                      </div>
                    </Link>
                    <div className='flex flex-row justify-between items-center h-full w-full p-1'>
                      <div className='flex flex-row justify-start gap-2'>
                        <PlayPomo id={todo_list.id} />
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
            <NewList />
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
