import { useEffect } from 'react';
import { useMutation } from 'react-query';

import ApiFace from '@Services/apiFace';
import Auth from '@Services/auth';

interface Props {
  onSuccess: () => void;
}

const SuccessRegister: React.FC<Props> = ({ onSuccess }) => {
  // Train Persons group
  const { data, isLoading, isError, mutate } = useMutation(
    'trainPersonsGroup',
    () => ApiFace.trainPersonsGroup()
  );

  // const { data, isLoading, isError, mutate } = useMutation(
  //   'trainPersonsGroup',
  //   () => Auth.registerUser({})
  // );

  useEffect(() => {
    mutate();
  }, []);

  console.log({ data });
  console.log({ isLoading });
  console.log({ isError });

  return (
    <div className="text-white">
      {isLoading && <p>CARGANDO...</p>}
      {!isLoading && <p>REGISTRO COMPLETADO</p>}
    </div>
  );
};

export default SuccessRegister;
