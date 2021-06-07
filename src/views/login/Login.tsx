import { useState } from 'react';
import { useRouter } from 'next/router';

import { useContextAuth } from '@Context/contextAuth';
import FormLogin from '@Components/FormUser/FormLogin';
import Link from '@Components/Links/Link';
import { UserResponse } from '@Types';
import VerifyIdentity from './components/VerifyIdentity';

const Login = () => {
  const [userData, setUserData] = useState<UserResponse | undefined>(undefined);
  const router = useRouter();
  const { setDataUserLocalStorage } = useContextAuth();

  const onSuccessUserForm = (user: UserResponse) => {
    setUserData(user);
  };

  const onSuccess = () => {
    setDataUserLocalStorage({
      personId: userData.personId,
      userId: userData._id,
      usuario: userData.usuario,
    });
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
              onSuccess={onSuccessUserForm}
              onError={onError}
            />
          </div>
        )}
        {userData && (
          <VerifyIdentity personId={userData.personId} onSuccess={onSuccess} />
        )}
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
