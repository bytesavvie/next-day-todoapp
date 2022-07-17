import Link from 'next/link';
import { query } from 'thin-backend';
import { useQuery, useIsLoggedIn } from 'thin-backend-react';
import DeleteList from './DeleteList';
import EditList from './EditList';
import NewList from './NewList';
import UserStatus from './UserStatus';

function TodoList() {
  const todo_lists = useQuery(query('todo_lists').orderByDesc('createdAt'));
  const todos = useQuery(query('todos').orderByDesc('createdAt'));

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
      <div className='w-screen h-screen flex flex-col justify-start items-center p-4'>
        <Link href='/todos'>
          <a className='text-[3rem] lg:text-[5rem] md:text-[5rem] font-extrabold text-gray-700'>
            <span className='text-indigo-500'>Next</span> Day
          </a>
        </Link>
        <UserStatus />
        <h3 className='text-[2rem] lg:text-[3rem] md:text-[3rem] font-extrabold text-gray-700 w-full lg:w-2/3 md:w-full'>
          Task Lists:
        </h3>

        <div className='grid grid-cols-1 grid-rows-3 lg:grid-rows-1 md:grid-rows-1 lg:grid-cols-3 md:grid-cols-3 gap-3 mt-3 pt-3 w-full lg:w-2/3 md:w-full'>
          {todo_lists?.map(
            (todo_list) => (
              (count = 0),
              (
                <div className='flex flex-col justify-center items-center rounded shadow-xl border-2 border-gray-500 h-full w-11/12 p-1 m-auto'>
                  <Link href={`/todos/${todo_list.id}`} key={todo_list.id}>
                    <div className='bg-slate-100 cursor-pointer flex flex-col justify-center items-start text-center h-full w-full p-6 rounded'>
                      <h2 className='text-2xl text-gray-700 font-semibold'>
                        {todo_list.name}
                      </h2>

                      <div>
                        {todos?.map((todo) =>
                          todo.todoListsId === todo_list.id
                            ? (count++,
                              (
                                <p key={todo.id}>
                                  {todo.name} {todo.isCompleted ? '✅' : '❌'}
                                </p>
                              ))
                            : null
                        )}
                      </div>
                      {count === 0 ? <p>The list is empty.</p> : null}
                    </div>
                  </Link>
                  <div className='flex flex-row justify-end gap-2 items-center h-full w-full p-1'>
                    <EditList id={todo_list.id} name={todo_list.name} />
                    <DeleteList listId={todo_list.id} />
                  </div>
                </div>
              )
            )
          )}
          <NewList />
        </div>
        <Link href='/'>
          <a className='text-base text-violet-600 underline decoration-dotted underline-offset-2 cursor-pointer mt-3'>
            Go Home 🏠
          </a>
        </Link>
      </div>
    )) || (
      <div className='w-screen h-screen flex flex-col justify-center items-center p-4'>
        <Link href='/todos'>
          <a className='text-[3rem] lg:text-[5rem] md:text-[5rem] font-extrabold text-gray-700'>
            <span className='text-indigo-500'>Next</span> Day
          </a>
        </Link>
        <UserStatus />
        <Link href='/'>
          <a className='text-base text-violet-600 underline decoration-dotted underline-offset-2 cursor-pointer mt-3'>
            Go Home 🏠
          </a>
        </Link>
      </div>
    )
  );
}

export default TodoList;
