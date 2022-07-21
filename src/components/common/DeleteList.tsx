import { deleteRecord } from 'thin-backend';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function DeleteList({ listId }: { listId: string }) {
  async function deleteTodoList() {
    await MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      focusCancel: true
    }).then((result) => {
      if (result.value) {
        deleteRecord('todo_lists', listId);
      }
    });
  }
  return (
    <div>
      <button onClick={deleteTodoList}>
        <div className='hover:scale-105 duration-100 cursor-pointer flex flex-col justify-center items-center text-center rounded shadow-sm border-2 border-gray-300 hover:border-gray-400 p-2'>
          <h2 className='text-sm text-gray-700 font-semibold'>
            <span role='img' aria-label='trash'>
              🗑
            </span>
          </h2>
        </div>
      </button>
    </div>
  );
}

export default DeleteList;
