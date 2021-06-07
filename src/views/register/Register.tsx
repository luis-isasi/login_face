import { useState } from 'react';
import { useRouter } from 'next/router';

import FormRegister from '@Components/FormUser/FormRegister';
import Link from '@Components/Links/Link';
import VerifyIdentity from './sections/VerifyIdentity';
import SuccessRegister from './sections/SuccessRegister';
import { UserRegister } from '@Types';

const Register = () => {
  const [stepRegister, setStepRegister] = useState<1 | 2 | 3>(1);
  const [userData, setUserData] = useState<UserRegister | undefined>(undefined);
  const router = useRouter();

  const onSuccessUserForm = ({
    usuario,
    contraseña,
    personId,
  }: UserRegister) => {
    setUserData({ usuario, contraseña, personId });
    // mostramos el compoente para rel reconociemiento facial
    setStepRegister(2);
  };

  const onErrorUserForm = () => {
    console.error('error');
  };

  const onSuccessVerifyIdentity = () => {
    setStepRegister(3);
  };

  const onSuccess = () => {
    router.push('/home');
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-96 h-auto box-border px-4 sm:px-0 flex flex-col items-center">
        <p className="text-white font-extrabold text-4xl py-4">Únete :D</p>
        {stepRegister === 1 && (
          <>
            <p className="text-white font-normal text-base py-1 text-center">
              <strong className="font-extrabold">Paso 1</strong>: Crea un nombre
              de usuario
            </p>
            <div className="min-w-0 w-full max-w-xs">
              <FormRegister
                typeForm="register"
                onSuccess={onSuccessUserForm}
                onError={onErrorUserForm}
              />
            </div>
          </>
        )}
        {stepRegister === 2 && userData && (
          <VerifyIdentity
            onSuccess={onSuccessVerifyIdentity}
            personId={userData?.personId}
          />
        )}
        {stepRegister === 3 && (
          <SuccessRegister userData={userData} onSuccess={onSuccess} />
        )}
        <div className="mt-5">
          <span className="text-white text-xs">
            ¿Ya tienes una cuenta?
            <Link
              href={'/login'}
              className="text-green-500 font-semibold ml-2"
              text="iniciar sesión"
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
