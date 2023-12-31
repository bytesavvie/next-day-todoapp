import { updateRecord } from 'thin-backend';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function EditTask({ ...props }) {
  async function editTask() {
    const { value: formValues } = await MySwal.fire({
      title: 'Edit task',
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
              value=${props.name}
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
              value=${props.duration}
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
      await updateRecord('todos', props.id, {
        name,
        // @ts-ignore
        duration
      });
    }
  }

  return (
    <div>
      <button onClick={editTask}>
        <div className='hover:scale-105 duration-100 cursor-pointer flex flex-col justify-center items-center text-center rounded shadow-sm border-2 border-gray-300 hover:border-emerald-500 p-2'>
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
