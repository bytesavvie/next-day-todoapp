import { deleteRecord } from 'thin-backend';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function DeleteTask({ taskId }: { taskId: string }) {
  async function deleteTask() {
    await MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      focusCancel: true
    }).then((result) => {
      if (result.value) {
        deleteRecord('todos', taskId);
      }
    });
  }
  return (
    <div>
      <button onClick={deleteTask}>
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

export default DeleteTask;
