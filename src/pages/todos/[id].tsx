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
        <div className='w-full h-full flex flex-col justify-start items-center p-4'>
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
          <div className='flex flex-row justify-center items-center w-full lg:w-3/4 md:w-full py-4 m-auto'>
            <div className='flex flex-row justify-between items-center w-full border-b-2 border-gray-300'>
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
                <div className='grid grid-cols-1 grid-rows-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 mt-3 pt-3 w-full lg:w-3/4 md:w-full'>
                  {todos.map(
                    (todo) => (
                      count++,
                      (
                        <div className='flex flex-col rounded shadow-sm hover:shadow-md border border-gray-300 h-full w-11/12 p-1 m-auto'>
                          <div
                            className='bg-neutral-100 flex flex-col justify-center items-start text-left h-full w-full p-6 rounded '
                            key={todo.id}
                          >
                            <h2 className='text-3xl text-gray-700 font-bold underline underline-offset-4 decoration-indigo-400 decoration-dashed'>
                              {todo.name}
                            </h2>
                            <ul className='list-none list-inside pt-2'>
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
                          <div className='flex flex-row justify-end gap-2 items-center h-full w-full p-1'>
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
            className='text-base text-violet-600 underline decoration-dotted underline-offset-2 cursor-pointer py-4'
          >
            Go Back To Lists ⬅️
          </Link>
        </div>
      </ThinBackend>
    )) || <></>
  );
};

export default Todo;
