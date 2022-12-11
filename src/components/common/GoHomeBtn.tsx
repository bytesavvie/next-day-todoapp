import Link from 'next/link';

function GoHomeBtn() {
  return (
    <Link
      href='/'
      className='px-4 py-2 my-4 text-xl font-bold text-white bg-indigo-600 rounded-full cursor-pointer hover:bg-indigo-500 focus:outline-none focus:shadow-outline'
    >
      Go Home 🏠
    </Link>
  );
}

export default GoHomeBtn;
