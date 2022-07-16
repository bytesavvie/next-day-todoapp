import { updateRecord } from 'thin-backend';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function EditList({ listId }: { listId: string }) {
  async function editListName() {
    await MySwal.fire({
      title: 'Edit list name',
      html: `
        <div class="grid grid-cols-1 grid-rows-1 gap-3 mt-3 pt-3 w-full lg:w-2/3 md:w-full">
          <div class="flex flex-col justify-center items-center text-center rounded shadow-xl border-2 border-gray-500 h-full w-full p-6">
          <label class="text-gray-700 font-semibold" for="name">List name</label>
            <input
              class="text-gray-700 font-semibold"
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
      }
    });

    const name = document.getElementById('name') as HTMLInputElement;
    if (name.value === '') {
      MySwal.showValidationMessage('Please fill out all fields');
      return;
    }

    updateRecord('todo_lists', listId, { name: name.value });
  }

  return (
    <div>
      <button onClick={editListName}>
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

export default EditList;
