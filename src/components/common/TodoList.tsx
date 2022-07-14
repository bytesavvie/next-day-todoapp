import Link from 'next/link';
import { query } from 'thin-backend';
import { useQuery } from 'thin-backend-react';

function TodoList() {
  const todo_lists = useQuery(query('todo_lists').orderByDesc('createdAt'));
  const todos = useQuery(query('todos').orderByDesc('createdAt'));

  if (todo_lists === null) {
    return <div>Loading ...</div>;
  }

  if (todos === null) {
    return <li>Loading ...</li>;
  }

  let count = 0;

  return (
    <div className='grid grid-cols-1 grid-rows-3 lg:grid-rows-1 md:grid-rows-1 lg:grid-cols-3 md:grid-cols-3 gap-3 mt-3 pt-3 w-full lg:w-2/3 md:w-full'>
      {todo_lists.map(
        (todo_list) => (
          (count = 0),
          (
            <Link href={`/todos/${todo_list.id}`} key={todo_list.id}>
              <div className='hover:scale-105 duration-500 cursor-pointer flex flex-col justify-center items-center text-center rounded shadow-xl border-2 border-gray-500 h-full w-full p-6'>
                <h2 className='text-2xl text-gray-700 font-semibold'>
                  {todo_list.name}
                </h2>

                <ul className='text-sm text-gray-600'>
                  {todos.map((todo) =>
                    todo.todoListsId === todo_list.id
                      ? (count++,
                        (
                          <li key={todo.id}>
                            {todo.name} {todo.completed ? '✅' : '❌'}
                          </li>
                        ))
                      : null
                  )}
                </ul>
                {count === 0 ? <p>The list is empty.</p> : null}
              </div>
            </Link>
          )
        )
      )}
    </div>
  );
}

export default TodoList;
