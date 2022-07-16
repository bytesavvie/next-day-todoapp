import Link from 'next/link';
import { query } from 'thin-backend';
import { useQuery, useIsLoggedIn } from 'thin-backend-react';
import DeleteList from './DeleteList';
import EditList from './EditList';
import NewList from './NewList';

function TodoList() {
  const todo_lists = useQuery(query('todo_lists').orderByDesc('createdAt'));
  const todos = useQuery(query('todos').orderByDesc('createdAt'));

  const isLoggedIn = useIsLoggedIn();

  if (todo_lists === null) {
    return <div>Loading ...</div>;
  }

  if (todos === null) {
    return <li>Loading ...</li>;
  }

  let count = 0;

  return (
    (isLoggedIn && (
      <div className='w-screen h-screen flex flex-col justify-start items-center p-4'>
        <h3 className='text-[2rem] lg:text-[3rem] md:text-[3rem] font-extrabold text-gray-700 w-full lg:w-2/3 md:w-full'>
          Task Lists:
        </h3>

        <div className='grid grid-cols-1 grid-rows-4 lg:grid-rows-1 md:grid-rows-1 lg:grid-cols-3 md:grid-cols-3 gap-3 mt-3 pt-3 w-full lg:w-2/3 md:w-full'>
          {todo_lists.map(
            (todo_list) => (
              (count = 0),
              (
                <div className='flex flex-col justify-between text-center rounded shadow-xl border-2 border-gray-500 h-full w-full p-1'>
                  <Link href={`/todos/${todo_list.id}`} key={todo_list.id}>
                    <div className='cursor-pointer flex flex-col items-start text-center  h-full w-full p-6'>
                      <h2 className='text-2xl text-gray-700 font-semibold'>
                        {todo_list.name}
                      </h2>

                      <ul className='text-sm text-gray-600'>
                        {todos.map((todo) =>
                          todo.todoListsId === todo_list.id
                            ? (count++,
                              (
                                <li key={todo.id}>
                                  {todo.name} {todo.isCompleted ? '✅' : '❌'}
                                </li>
                              ))
                            : null
                        )}
                      </ul>
                      {count === 0 ? <p>The list is empty.</p> : null}
                    </div>
                  </Link>
                  <hr />
                  <div className='flex flex-row justify-end gap-2 items-center h-full w-full p-1'>
                    <EditList listId={todo_list.id} />
                    <DeleteList listId={todo_list.id} />
                  </div>
                </div>
              )
            )
          )}
          <NewList />
        </div>
      </div>
    )) || <></>
  );
}

export default TodoList;
