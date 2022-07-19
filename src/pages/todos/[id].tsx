import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { query } from 'thin-backend';
import { useQuery, useIsLoggedIn } from 'thin-backend-react';
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
      <div>
        <Head>
          <title>Next Day | {current_todo_list?.name}</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <div className='w-full h-screen flex flex-col justify-start items-center p-4'>
          {todo_list === null ? (
            <div>Loading ...</div>
          ) : (
            todo_list.map((todo_list) => (
              <>
                <Link href='/todos'>
                  <a className='text-[3rem] lg:text-[5rem] md:text-[5rem] font-extrabold text-gray-700'>
                    <span className='text-indigo-500'>Next</span> Day
                  </a>
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

          <h3 className='text-[2rem] lg:text-[3rem] md:text-[3rem] font-extrabold text-gray-700 w-full lg:w-2/3 md:w-full mt-3'>
            Tasks:
          </h3>

          {todos === null ? (
            <div>Loading ...</div>
          ) : (
            ((count = 0),
            (
              <>
                <div className='grid grid-cols-1 grid-rows-3 lg:grid-rows-1 md:grid-rows-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 mt-3 pt-3 w-full lg:w-3/4 md:w-full'>
                  {todos.map(
                    (todo) => (
                      count++,
                      (
                        <div className='flex flex-col rounded shadow-xl border-2 border-gray-500 h-full w-11/12 p-1 m-auto'>
                          <div
                            className='bg-slate-100 flex flex-col justify-center items-start text-left h-full w-full p-6 rounded '
                            key={todo.id}
                          >
                            <h2 className='text-3xl text-gray-700 font-bold underline underline-offset-4 decoration-indigo-400 decoration-dashed'>
                              {todo.name}
                            </h2>
                            <ul className='list-none list-inside pl-'>
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
                  <NewTask todo_list_id={todo_list_id!} />
                </div>
                {count === 0 ? <p>The list is empty.</p> : null}
              </>
            ))
          )}

          <Link href='/todos'>
            <a className='text-base text-violet-600 underline decoration-dotted underline-offset-2 cursor-pointer py-4'>
              Go Back To Lists ⬅️
            </a>
          </Link>
        </div>
      </div>
    )) || <></>
  );
};

export default Todo;
