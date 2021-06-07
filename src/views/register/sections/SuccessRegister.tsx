import { useEffect } from 'react';
import { useMutation } from 'react-query';

import { UserRegister } from '@Types';
import ApiFace from '@Services/apiFace';
import Auth from '@Services/auth';
import { useContextAuth } from '@Context/contextAuth';

interface Props {
  onSuccess: () => void;
  userData: UserRegister;
}

const SuccessRegister: React.FC<Props> = ({ onSuccess, userData }) => {
  // Train Persons group
  const { mutate: mutateTrain } = useMutation('trainPersonsGroup', () =>
    ApiFace.trainPersonsGroup()
  );
  const { setDataUserLocalStorage } = useContextAuth();

  //Register User
  const {
    // data,
    isLoading,
    // isError,
    isSuccess,
    mutate: mutateRegister,
  } = useMutation(() => Auth.registerUser(userData), {
    onSuccess: (data) => {
      setDataUserLocalStorage({
        personId: userData.personId,
        userId: data._id,
        usuario: data.usuario,
      });
      onSuccess();
    },
  });

  useEffect(() => {
    mutateTrain();
    mutateRegister();
  }, []);

  return (
    <div className="text-white ">
      <p className="text-green-500 font-semibold text-base text-center w-full h-auto py-2">
        {isLoading && 'CARGANDO...'}
        {isSuccess && 'REGISTRO COMPLETADO'}
      </p>
    </div>
  );
};

export default SuccessRegister;
