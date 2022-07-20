import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Pomo from './Pomo';

const MySwal = withReactContent(Swal);

const PlayPomo = ({ ...props }) => {
  function playPomo() {
    MySwal.fire({
      title: '',
      html: <Pomo id={props.id} count={props.count} />,
      showConfirmButton: false,
      showCancelButton: false,
      allowOutsideClick: false
    });
  }

  return (
    <div>
      <button onClick={playPomo}>
        <div className='hover:scale-105 duration-100 cursor-pointer flex flex-col justify-center items-center text-center rounded shadow-xl border-2 border-gray-500 p-2'>
          <h2 className='text-sm text-gray-700 font-bold'>
            {/* tomatoe emoji */}
            <span role='img' aria-label='tomato'>
              🍅
            </span>{' '}
            <span>Pomo</span>
          </h2>
        </div>
      </button>
    </div>
  );
};

export default PlayPomo;
