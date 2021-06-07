import { useState } from 'react';
import { useRouter } from 'next/router';

import FormLogin from '@Components/FormUser/FormLogin';
import Link from '@Components/Links/Link';
import { UserResponse } from '@Types';
import VerifyIdentity from './components/VerifyIdentity';

const Login = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserResponse | undefined>(undefined);

  const onSuccess = (user: UserResponse) => {
    console.log({ user });
    setUserData(user);
    router.push('/home');
  };

  const onError = () => {
    console.error('error');
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-96 box-border px-4 sm:px-0 flex flex-col items-center">
        <p className="text-white font-extrabold w-full text-center text-2xl sm:text-4xl mb-1">
          Bienvenido de vuelta
        </p>
        <p className="text-white text-center mb-6">
          Que bueno verte otra vez :)
        </p>
        {!userData && (
          <div className="min-w-0 w-full max-w-xs">
            <FormLogin
              typeForm="login"
              onSuccess={onSuccess}
              onError={onError}
            />
          </div>
        )}
        {userData && <VerifyIdentity />}
        <div className="mt-5">
          <span className="text-white text-xs">
            ¿Aún no tienes una cuenta?
            <Link
              href={'/register'}
              className="text-green-500 font-semibold ml-2"
              text="Regístrate"
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
