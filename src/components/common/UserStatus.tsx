import { useState, useEffect } from 'react';
import { ThinBackend, useCurrentUser, useIsLoggedIn } from 'thin-backend-react';
import SignInBtn from '../auth/SignInBtn';
import SignOutBtn from '../auth/SignOutBtn';

const UserStatus = () => {
  const currentUser = useCurrentUser();
  const isLoggedIn = useIsLoggedIn();

  const [user, setUser] = useState(currentUser);

  useEffect(() => {
    if (isLoggedIn === true) {
      setUser(currentUser);
    }
  }, [currentUser, isLoggedIn]);

  if (isLoggedIn === true) {
    return (
      <ThinBackend>
        <h2 className='text-2xl text-gray-700'>
          Welcome{' '}
          <span className='font-bold'>
            {user?.email.split('@')[0]}
            <span className='text-indigo-500'>!</span>
          </span>
        </h2>
        <SignOutBtn />
      </ThinBackend>
    );
  }

  if (isLoggedIn === false) {
    return (
      <>
        <p className='pt-4 text-xl'>
          <span className='font-semibold'>Sign in</span> to your account or
          <span className='font-semibold'> create a new one.</span>
        </p>
        <p className='font-semibold text-gray-500'>
          Demo: test@mail.com - test123
        </p>
        <div className='flex flex-row justify-center items-center mt-3'>
          <SignInBtn />
        </div>
      </>
    );
  }

  return <p>Loading...</p>;
};

export default UserStatus;
