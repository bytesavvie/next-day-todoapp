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
      className='bg-purple-700 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-full ml-2 mt-3'
    >
      Sign In
    </button>
  );
};

export default SignInBtn;
