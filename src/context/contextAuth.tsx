import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { USER_SESSION } from '@Constants';
import { User } from '@Types';

interface TypeContextUser {
  user: User;
  signoutUser: () => void;
  setDataUserLocalStorage: (user: User) => void;
  isLoading: boolean;
}

//Context
const ContextAuth = createContext<TypeContextUser | undefined>(undefined);

//Provider
export const ContextAuthProvider = ({ children }) => {
  const [user, setUser] = useState<undefined | null | User>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const user: User = JSON.parse(localStorage.getItem(USER_SESSION));
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
    //change isLoading
    setIsLoading(false);
  }, []);

  const setDataUserLocalStorage = (user: User) => {
    localStorage.setItem(USER_SESSION, JSON.stringify(user));
    setUser(user);
  };

  const signoutUser = () => {
    localStorage.removeItem(USER_SESSION);
    setUser(null);
    router.push('/');
  };

  return (
    <ContextAuth.Provider
      value={{
        user,
        signoutUser,
        setDataUserLocalStorage,
        isLoading,
      }}
    >
      {children}
    </ContextAuth.Provider>
  );
};

//Hook
export const useContextAuth = () => {
  const dataUser = useContext(ContextAuth);

  if (typeof dataUser === 'undefined') {
    throw new Error('useUser must be withing ContextUserProvider');
  }

  return dataUser;
};
