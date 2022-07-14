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
      className='bg-purple-700 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-full mt-3'
    >
      Sign Out
    </button>
  );
};

export default SignOutBtn;
