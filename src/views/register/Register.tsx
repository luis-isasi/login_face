import { useRouter } from 'next/router';

import UserForm from '@Components/UserForm';
import Auth from '@Services/auth';
import Link from '@Components/Links/Link';

const Register = () => {
  const router = useRouter();

  const onSuccess = () => {
    router.push('/home');
  };

  const onError = () => {
    console.error('error');
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-96 box-border px-4 sm:px-0 flex flex-col items-center">
        <p className="text-white font-extrabold text-4xl py-5">Únete hoy</p>
        <div className="min-w-0 w-full max-w-xs">
          <UserForm
            mutation={Auth.registerUser}
            typeForm="register"
            onSuccess={onSuccess}
            onError={onError}
          />
        </div>
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
      <style global jsx>{`
        body {
          //bg-base-main
          background-color: rgba(24, 27, 50, 1) !important;
        }
      `}</style>
    </div>
  );
};

export default Register;
