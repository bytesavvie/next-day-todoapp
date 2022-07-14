import Link from 'next/link';
import { useRouter } from 'next/router';
import { query } from 'thin-backend';
import { useQuery } from 'thin-backend-react';

const Todo = () => {
  const router = useRouter();
  const { id } = router.query;

  const todo_list_id = id!.toString();

  const todo_list = useQuery(query('todo_lists').where('id', todo_list_id));

  const todos = useQuery(
    query('todos').where('todoListsId', todo_list_id).orderByDesc('createdAt')
  );

  let count = 0;

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center p-4'>
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
                    <div
                      className='hover:scale-105 duration-500 cursor-pointer flex flex-col justify-center items-center text-center rounded shadow-xl border-2 border-gray-500 h-full w-full p-6'
                      key={todo.id}
                    >
                      <h2 className='text-2xl text-gray-700 font-semibold'>
                        {todo.name}
                      </h2>{' '}
                      <p>Duration: {todo.duration}min</p>
                      <p>Completed: {todo.completed ? '✅' : '❌'}</p>
                    </div>
                  )
                )
              )}
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
  );
};

export default Todo;
