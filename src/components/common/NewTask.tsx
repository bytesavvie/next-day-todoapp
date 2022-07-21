import { createRecord, getCurrentUserId } from 'thin-backend';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function NewTask({ todo_list_id }: { todo_list_id: string }) {
  const user_id = getCurrentUserId();

  async function addTask() {
    const { value: formValues } = await MySwal.fire({
      title: 'Create a new task',
      html: `
        <div class="grid grid-cols-1 grid-rows-2 gap-3 mt-3 pt-3 w-full">
          <div class="flex flex-col justify-center items-center text-center h-full w-full p-2">
          <label class="text-gray-700 font-semibold pb-2" for="name">Task name</label>
            <input
              class="text-gray-700 font-semibold rounded shadow-xl border-2 border-gray-500 p-2"
              type="text"
              placeholder="Task name"
              aria-label="Task name"
              aria-required="true"
              required
              id="name"
            />
          </div>
          <div class="flex flex-col justify-center items-center text-center h-full w-full p-2">
            <label class="text-gray-700 font-semibold pb-2" for="duration">Duration (in minutes)</label>
          <input
              class="text-gray-700 font-semibold rounded shadow-md border-2 border-gray-500 p-2"
              type="number"
              placeholder="Duration"
              aria-label="Duration"
              aria-required="true"
              required
              id="duration"
            />
          </div>
        </div>
      `,
      showCancelButton: true,
      didOpen: () => {
        document.getElementById('name')?.focus();
      },
      preConfirm: () => {
        const name = document.getElementById('name') as HTMLInputElement;
        const duration = document.getElementById(
          'duration'
        ) as HTMLInputElement;
        if (
          name.value === '' ||
          duration.value === '' ||
          duration.value === '0'
        ) {
          MySwal.showValidationMessage('Please fill in all fields');
          return false;
        }
        return {
          name: name.value,
          duration: parseInt(duration.value)
        };
      }
    });

    if (formValues) {
      const { name, duration } = formValues;
      await createRecord('todos', {
        name,
        // @ts-ignore
        duration,
        todoListsId: todo_list_id,
        userId: user_id
      });
    }
  }
  return (
    <button
      className='flex flex-col items-start justify-start'
      onClick={addTask}
    >
      <div className='cursor-pointer flex flex-col justify-center items-center text-center rounded border-[3px] border-indigo-100 hover:bg-indigo-100 hover:shadow-lg duration-75 h-1/8 w-full p-2'>
        <h2 className='text-base sm:text-xl text-gray-700 font-semibold'>
          {/* small plus emoji then Add New List */}
          <span role='img' aria-label='plus'>
            📝
          </span>
          <span className='hidden sm:inline-block'>Add</span> New
        </h2>
      </div>
    </button>
  );
}

export default NewTask;
