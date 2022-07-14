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
        <p>Welcome {user?.email.split('@')[0]}</p>
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
