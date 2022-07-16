import type { NextPage } from 'next';
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
    query('todos').where('todoListsId', todo_list_id!).orderByDesc('createdAt')
  );

  let count = 0;

  return (
    (isLoggedIn && (
      <div className='w-screen h-screen flex flex-col justify-start items-center p-4'>
        {todo_list === null ? (
          <div>Loading ...</div>
        ) : (
          todo_list.map((todo_list) => (
            <>
              <h1
                className='text-[3rem] lg:text-[5rem] md:text-[5rem] font-extrabold text-gray-700'
                key={todo_list.id}
              >
                <p>{todo_list.name}</p>
              </h1>
              <p>Todo-ID: {id}</p>
            </>
          ))
        )}

        <h3 className='text-[2rem] lg:text-[3rem] md:text-[3rem] font-extrabold text-gray-700 w-full lg:w-2/3 md:w-full'>
          Tasks:
        </h3>

        {todos === null ? (
          <div>Loading ...</div>
        ) : (
          ((count = 0),
          (
            <>
              <div className='grid grid-cols-1 grid-rows-3 lg:grid-rows-1 md:grid-rows-1 lg:grid-cols-3 md:grid-cols-3 gap-3 mt-3 pt-3 w-full lg:w-2/3 md:w-full'>
                {todos.map(
                  (todo) => (
                    count++,
                    (
                      <div className='flex flex-col text-center rounded shadow-xl border-2 border-gray-500 h-full w-full p-1'>
                        <div
                          className='flex flex-col justify-center items-start text-center h-full w-full p-6'
                          key={todo.id}
                        >
                          <h2 className='text-2xl text-gray-700 font-semibold'>
                            {todo.name}
                          </h2>{' '}
                          <p>Duration: {todo.duration}min</p>
                          <p>Completed: {todo.isCompleted ? '✅' : '❌'}</p>
                        </div>
                        <hr />
                        <div className='flex flex-row justify-end gap-2 items-center h-full w-full p-1'>
                          <EditTask taskId={todo.id} />
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
          <a className='text-sm text-violet-500 underline decoration-dotted underline-offset-2 cursor-pointer mt-3'>
            Go Back To List ⬅️
          </a>
        </Link>
      </div>
    )) || <></>
  );
};

export default Todo;
