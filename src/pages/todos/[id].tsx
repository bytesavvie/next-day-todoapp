import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { query } from 'thin-backend';
import { useQuery, useIsLoggedIn, ThinBackend } from 'thin-backend-react';
import DeleteTask from '../../components/common/DeleteTask';
import EditTask from '../../components/common/EditTask';
import NewTask from '../../components/common/NewTask';

const Todo: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const todo_list_id = id?.toString();

  const isLoggedIn = useIsLoggedIn();

  const todo_list = useQuery(query('todo_lists').where('id', todo_list_id!));

  const todos = useQuery(
    query('todos').where('todoListsId', todo_list_id!).orderByAsc('createdAt')
  );

  let count = 0;

  // get current todo list with todo_list_id
  const current_todo_list = todo_list?.find(
    (todo_list) => todo_list.id === todo_list_id
  );

  return (
    (isLoggedIn && (
      <ThinBackend>
        <Head>
          <title>Next Day | {current_todo_list?.name}</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <div className='flex flex-col items-center justify-between w-full h-full min-h-screen p-4'>
          {todo_list === null ? (
            <div>Loading ...</div>
          ) : (
            todo_list.map((todo_list) => (
              <>
                <Link
                  href='/todos'
                  className='text-[3rem] lg:text-[5rem] md:text-[5rem] font-extrabold text-gray-700'
                >
                  <span className='text-indigo-500'>Next</span> Day
                </Link>
                <h1
                  className='text-[3rem] lg:text-[5rem] md:text-[5rem] font-extrabold text-gray-700'
                  key={todo_list.id}
                >
                  <p>{todo_list.name}</p>
                </h1>
              </>
            ))
          )}
          <div className='flex flex-row items-center justify-center w-full px-8 py-4 sm:px-16 xl:px-64'>
            <div className='flex flex-row items-center justify-between w-full border-b-2 border-gray-300'>
              <h3 className='text-[2rem] lg:text-[3rem] md:text-[3rem] font-extrabold text-gray-700'>
                Tasks:
              </h3>
              <NewTask todo_list_id={todo_list_id!} />
            </div>
          </div>

          {todos === null ? (
            <div>Loading ...</div>
          ) : (
            ((count = 0),
            (
              <>
                <div className='grid w-full grid-cols-1 grid-rows-2 gap-3 px-8 pt-3 mt-3 sm:px-16 xl:px-64 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
                  {todos.map(
                    (todo) => (
                      count++,
                      (
                        <div className='flex flex-col w-full h-full p-1 m-auto border border-gray-300 rounded shadow-sm hover:shadow-md'>
                          <div
                            className='flex flex-col items-start justify-center w-full h-full p-6 text-left rounded bg-neutral-100 '
                            key={todo.id}
                          >
                            <h2 className='text-3xl font-bold text-gray-700 underline underline-offset-4 decoration-indigo-400 decoration-dashed'>
                              {todo.name}
                            </h2>
                            <ul className='pt-2 list-none list-inside'>
                              <li>
                                Duration:{' '}
                                <span className='font-semibold'>
                                  {todo.duration} min
                                </span>
                              </li>
                              <li>
                                Completed: {todo.isCompleted ? '✅' : '❌'}
                              </li>
                            </ul>
                          </div>
                          <div className='flex flex-row items-center justify-end w-full h-full gap-2 p-1'>
                            <EditTask
                              id={todo.id}
                              name={todo.name.replace(/ /g, '\u00a0')}
                              duration={todo.duration}
                            />
                            <DeleteTask taskId={todo.id} />
                          </div>
                        </div>
                      )
                    )
                  )}
                </div>
                {count === 0 ? <p>The list is empty.</p> : null}
              </>
            ))
          )}

          <Link
            href='/todos'
            className='px-4 py-2 my-4 text-xl font-bold text-white bg-indigo-600 rounded-full cursor-pointer hover:bg-indigo-500 focus:outline-none focus:shadow-outline'
          >
            Back To Lists ⬅️
          </Link>
        </div>
      </ThinBackend>
    )) || <></>
  );
};

export default Todo;
