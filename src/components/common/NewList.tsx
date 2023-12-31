import { createRecord, getCurrentUserId } from 'thin-backend';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function NewList() {
  async function addTodoList() {
    const userId = getCurrentUserId();

    const { value: formValues } = await MySwal.fire({
      title: 'Create a new list',
      html: `
        <div class="grid grid-cols-1 grid-rows-1 gap-3 mt-3 pt-3 w-full">
          <div class="flex flex-col justify-center items-center text-center h-full w-full p-2">
          <label class="text-gray-700 font-semibold pb-2" for="name">List name</label>  
          <input
              class="text-gray-700 font-semibold rounded shadow-md border-2 border-gray-500 p-2"
              type="text"
              placeholder="List name"
              aria-label="List name"
              aria-required="true"
              required
              id="name"
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
        if (name.value === '' || name.value === null) {
          MySwal.showValidationMessage('Please fill out all fields');
          return false;
        }
        return {
          name: name.value,
          userId: userId
        };
      }
    });

    if (formValues) {
      createRecord('todo_lists', formValues);
    }
  }

  return (
    <button
      className='flex flex-col items-start justify-start'
      onClick={addTodoList}
    >
      <div className='cursor-pointer flex flex-col justify-center items-center text-center rounded border-[3px] border-indigo-100 hover:bg-indigo-100 hover:shadow-lg duration-75 h-1/8 w-full p-2 my-2'>
        <h2 className='text-base sm:text-xl text-gray-700 font-semibold'>
          {/* small plus emoji then Add New List */}
          <span role='img' aria-label='plus'>
            📝{' '}
          </span>
          <span className='hidden sm:inline-block'>Add</span> New
        </h2>
      </div>
    </button>
  );
}

export default NewList;
