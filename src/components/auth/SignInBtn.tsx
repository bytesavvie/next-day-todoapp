import { useState } from 'react';
import { loginWithRedirect } from 'thin-backend';

const SignInBtn = () => {
  const [isLoading, setLoading] = useState(false);

  async function doLogIn() {
    setLoading(true);
    await loginWithRedirect();
    setLoading(false);
  }

  return (
    <button
      onClick={() => doLogIn()}
      disabled={isLoading}
      className='bg-indigo-700 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-full mt-3'
    >
      Sign in
    </button>
  );
};

export default SignInBtn;
