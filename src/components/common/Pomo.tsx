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
  //   const [isSelected, setIsSelected] = useState(todos?.[0]?.id);

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

  return (
    <div>
      <div className='flex flex-row justify-end'>
        <button
          onClick={() => Swal.close()}
          className='bg-slate-400 hover:bg-rose-400 text-white font-bold rounded-full w-7 h-7 text-xs'
        >
          X
        </button>
      </div>
      <div className='grid grid-cols-2 grid-rows-1 pt-4 w-full h-full divide-x overflow-hidden'>
        <div className='flex flex-col justify-center items-center h-full w-full p-4'>
          <div className='flex flex-col justify-between items-center h-full w-full p-4 max-h-48'>
            <div className='text-3xl font-bold'>{todoName}</div>
            <div className='text-3xl font-semibold'>{todoDurationString}</div>
            {isPlaying ? (
              <button
                className='bg-slate-400 hover:bg-rose-400 text-white font-bold py-2 px-4 rounded-full'
                onClick={() => setIsPlaying(false)}
              >
                <span className='text-xl'>Pause</span>
              </button>
            ) : (
              <button
                className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-5 rounded-full'
                onClick={() => setIsPlaying(true)}
              >
                <span className='text-xl'>Start</span>
              </button>
            )}
          </div>
        </div>
        <div className='flex flex-col justify-start items-start h-full w-full p-4 divide-y max-h-64 overflow-auto'>
          {todos?.map((todo) => (
            <>
              <button
                className={`cursor-pointer flex flex-row justify-start items-center h-full w-full p-1  rounded text-lg text-gray-700 font-semibold ${
                  selectedTodoId == todo.id &&
                  todo.isCompleted == false &&
                  'bg-slate-300'
                } ${todo.isCompleted && 'bg-green-300'}`}
                onClick={() => setSelectedTodoId(todo.id)}
              >
                {todo.isCompleted ? '✅' : '❌'} {todo.name} - {todo.duration}
                min
              </button>
              <button
                className={`cursor-default text-base flex flex-row justify-start items-center h-full w-full p-1 rounded ${
                  selectedTodoId == todo.id &&
                  todo.isCompleted == false &&
                  'bg-green-100'
                } ${todo.isCompleted && 'bg-green-300'}`}
                id={todo.id}
              >
                Take a break for 10min
              </button>
            </>
          ))}
          <div className='text-base flex flex-row justify-center items-center h-full w-full rounded'>
            Done!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pomo;
