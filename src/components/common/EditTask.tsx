import { updateRecord } from 'thin-backend';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function EditTask({ taskId }: { taskId: string }) {
  async function editTask() {
    const { value: formValues } = await MySwal.fire({
      title: 'Edit task',
      html: `
        <div class="grid grid-cols-1 grid-rows-2 gap-3 mt-3 pt-3 w-full">
          <div class="flex flex-col justify-center items-center text-center rounded shadow-xl border-2 border-gray-500 h-full w-full p-6">
          <label class="text-gray-700 font-semibold" for="name">Task name</label>
            <input
              class="text-gray-700 font-semibold"
              type="text"
              placeholder="Task name"
              aria-label="Task name"
              aria-required="true"
              required
              id="name"
            />
          </div>
          <div class="flex flex-col justify-center items-center text-center rounded shadow-xl border-2 border-gray-500 h-full w-full p-6">
            <label class="text-gray-700 font-semibold" for="duration">Duration (in minutes)</label>
          <input
              class="text-gray-700 font-semibold"
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
      await updateRecord('todos', taskId, {
        name,
        // @ts-ignore
        duration
      });
    }
  }

  return (
    <div>
      <button onClick={editTask}>
        <div className='hover:scale-105 duration-500 cursor-pointer flex flex-col justify-center items-center text-center rounded shadow-xl border-2 border-gray-500 p-2'>
          <h2 className='text-sm text-gray-700 font-semibold'>
            <span role='img' aria-label='edit'>
              ✏️
            </span>
          </h2>
        </div>
      </button>
    </div>
  );
}

export default EditTask;
