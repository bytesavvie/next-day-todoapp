import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Pomo from './Pomo';

const MySwal = withReactContent(Swal);

const PlayPomo = ({ ...props }) => {
  function playPomo() {
    MySwal.fire({
      title: '',
      html: <Pomo id={props.id} />,
      showConfirmButton: false,
      showCancelButton: false
    });
  }

  return (
    <div>
      <button onClick={playPomo}>
        <div className='hover:scale-105 duration-500 cursor-pointer flex flex-col justify-center items-center text-center rounded shadow-xl border-2 border-gray-500 p-2'>
          <h2 className='text-sm text-gray-700 font-semibold'>
            {/* tomatoe emoji */}
            <span role='img' aria-label='tomato'>
              🍅
            </span>{' '}
            Pomo
          </h2>
        </div>
      </button>
    </div>
  );
};

export default PlayPomo;
