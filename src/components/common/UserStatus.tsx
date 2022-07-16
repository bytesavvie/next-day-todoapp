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
            <span className='text-indigo-300'>!</span>
          </span>
        </h2>
        <SignOutBtn />
      </ThinBackend>
    );
  }

  if (isLoggedIn === false) {
    return (
      <>
        <p>Sign In to your account.</p>
        <div className='flex flex-row justify-center items-center mt-3'>
          <SignInBtn />
        </div>
      </>
    );
  }

  return <p>Loading...</p>;
};

export default UserStatus;
