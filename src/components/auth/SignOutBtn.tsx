import { useState } from 'react';
import { logout } from 'thin-backend';

const SignOutBtn = () => {
  const [isLoading, setLoading] = useState(false);

  async function doLogOut() {
    setLoading(true);
    await logout({ redirect: 'http://nextday.vercel.app' });
    // ({ redirect: 'http://localhost:3000/' })
    setLoading(false);
  }

  return (
    <button
      onClick={() => doLogOut()}
      disabled={isLoading}
      className='px-4 py-2 mt-2 font-bold text-white bg-indigo-700 rounded-full hover:bg-indigo-500'
    >
      Sign out
    </button>
  );
};

export default SignOutBtn;
