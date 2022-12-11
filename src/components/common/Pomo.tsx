import { useState, useEffect } from 'react';
import { query, updateRecord } from 'thin-backend';
import { useQuery } from 'thin-backend-react';
import Swal from 'sweetalert2';

const Pomo = ({ ...props }) => {
  const todos = useQuery(
    query('todos').where('todoListsId', props.id).orderByAsc('createdAt')
  );

  const [selectedTodoId, setSelectedTodoId] = useState(todos?.[0]?.id);
  const [todoName, setTodoName] = useState(todos?.[0]?.name);
  const [todoDurationSeconds, setTodoDurationSeconds] = useState(
    todos?.[0]?.duration! * 60
  );
  const [todoDurationString, setTodoDurationString] = useState(`00:00`);
  const [isPlaying, setIsPlaying] = useState(false);

  // get todo by selectedTodoId
  const selectedTodo = todos?.find((todo) => todo.id === selectedTodoId);

  useEffect(() => {
    if (isPlaying) {
      if (todoDurationSeconds >= 0) {
        const interval = setInterval(() => {
          setTodoDurationSeconds(todoDurationSeconds - 1);
          // diplay time in mm:ss format
          const minutes = Math.floor(todoDurationSeconds / 60);
          const seconds = todoDurationSeconds % 60;
          setTodoDurationString(
            `${minutes < 10 ? `0${minutes}` : minutes}:${
              seconds < 10 ? `0${seconds}` : seconds
            }`
          );
        }, 1000);
        return () => clearInterval(interval);
      } else {
        updateRecord('todos', selectedTodoId!, {
          // @ts-ignore
          isCompleted: true
        });
      }
    }

    if (selectedTodoId && !isPlaying) {
      const todo = todos?.find((todo) => todo.id === selectedTodoId);
      const minutes = Math.floor((todo?.duration! * 60) / 60);
      const seconds = (todo?.duration! * 60) % 60;
      setTodoName(todo?.name);
      setTodoDurationSeconds(todo?.duration! * 60);
      setTodoDurationString(
        `${minutes < 10 ? `0${minutes}` : minutes}:${
          seconds < 10 ? `0${seconds}` : seconds
        }`
      );
    }
    if (!selectedTodoId && !isPlaying) {
      const minutes = Math.floor((todos?.[0]?.duration! * 60) / 60);
      const seconds = (todos?.[0]?.duration! * 60) % 60;
      setSelectedTodoId(todos?.[0]?.id);
      setTodoName(todos?.[0]?.name);
      setTodoDurationSeconds(todos?.[0]?.duration! * 60);
      setTodoDurationString(
        `${minutes < 10 ? `0${minutes}` : minutes}:${
          seconds < 10 ? `0${seconds}` : seconds
        }`
      );
    }
  }, [isPlaying, selectedTodoId, todos, todoDurationSeconds]);

  const isAllTodosCompleted = todos?.every((todo) => todo.isCompleted);

  return (
    <div>
      <div className='flex flex-row justify-end'>
        <button
          onClick={() => Swal.close()}
          className='mt-1 mb-4 mr-1 text-xs font-bold text-white rounded-full bg-slate-400 hover:bg-rose-400 w-7 h-7'
        >
          X
        </button>
      </div>
      <div className='grid w-full h-full grid-cols-2 grid-rows-1 pb-4 overflow-hidden divide-x'>
        <div className='flex flex-col items-center justify-center w-full h-full'>
          <div className='flex flex-col items-center justify-between w-full h-36'>
            {props.count === 0 && (
              <div className='text-2xl font-semibold'>
                You don&apos;t have any todos yet.{' '}
                <span className='text-indigo-500'>
                  Click on a list to add them
                </span>
                .
              </div>
            )}
            {isAllTodosCompleted && props.count > 0 && (
              <div className='text-2xl font-semibold'>
                <span className='text-indigo-500'>Great job</span>!
                <br />
                <span>You completed all your </span>
                <span className='text-indigo-500'>tasks</span>!
                <br />
                <br />
                <span className='text-lg'>Get some rest 😌</span>
              </div>
            )}

            {!selectedTodo?.isCompleted && (
              <div className='text-2xl font-bold sm:text-3xl'>{todoName}</div>
            )}
            {!selectedTodo?.isCompleted && props.count > 0 && (
              <div className='text-3xl font-semibold sm:text-4xl'>
                {todoDurationString}
              </div>
            )}

            {selectedTodo?.isCompleted && !isAllTodosCompleted && (
              <div className='text-4xl font-semibold'>Done!</div>
            )}
            {isPlaying ? (
              <button
                className='px-4 py-2 font-bold text-white rounded-full bg-slate-400 hover:bg-rose-400'
                onClick={() => setIsPlaying(false)}
              >
                <span className='text-lg sm:text-xl'>Stop</span>
              </button>
            ) : (
              <button
                className={`bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-500 ${
                  isAllTodosCompleted && 'hidden'
                }`}
                onClick={() => setIsPlaying(true)}
                disabled={selectedTodo?.isCompleted}
              >
                <span className='text-xl'>Start</span>
              </button>
            )}
          </div>
        </div>
        <div className='flex flex-col items-start justify-start w-full h-full p-0 pl-1 pr-4 overflow-auto divide-y max-h-64'>
          {todos?.map((todo) => (
            <>
              <button
                className={`cursor-pointer flex flex-row justify-start items-center h-full w-full p-1  rounded text-sm sm:text-lg text-gray-700 font-semibold ${
                  selectedTodoId === todo.id &&
                  todo.isCompleted == false &&
                  'bg-indigo-200'
                } 
                
                ${
                  selectedTodoId !== todo.id &&
                  todo.isCompleted === false &&
                  'bg-gray-200'
                }
                ${
                  todo.isCompleted && 'bg-green-300'
                } disabled:opacity-60 disabled:cursor-not-allowed`}
                onClick={() => setSelectedTodoId(todo.id)}
                disabled={isPlaying && !(selectedTodoId == todo.id)}
              >
                {todo.isCompleted ? '✅' : '❌'} {todo.name} - {todo.duration}
                min
              </button>
              <button
                className={`cursor-pointer text-sm sm:text-lg flex flex-row justify-start items-center h-full w-full p-1 rounded ${
                  selectedTodoId === todo.id &&
                  todo.isCompleted === false &&
                  'bg-rose-100'
                } 
                ${
                  selectedTodoId !== todo.id &&
                  todo.isCompleted === false &&
                  'bg-gray-100'
                }
                ${
                  todo.isCompleted && 'bg-green-100'
                } disabled:opacity-60 disabled:cursor-not-allowed`}
                onClick={() => setSelectedTodoId(todo.id)}
                disabled={isPlaying && !(selectedTodoId == todo.id)}
              >
                Take a break for 10min
              </button>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pomo;
