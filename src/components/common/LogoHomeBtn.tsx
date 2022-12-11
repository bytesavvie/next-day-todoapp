import Link from 'next/link';

function LogoHomeBtn() {
  return (
    <Link
      href='/'
      className='text-[3rem] lg:text-[5rem] md:text-[5rem] font-extrabold text-gray-700'
    >
      <span className='text-indigo-500'>Next</span> Day
    </Link>
  );
}

export default LogoHomeBtn;
