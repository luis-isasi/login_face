import { useReducer, useCallback } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import debounce from 'lodash/debounce';

import Auth from '@Services/auth';
import ApiFace from '@Services/apiFace';
import FormField from './components/FormField';
import Btn from './components/Btn';
import { PropsFormUser, InitialState, FormAction } from './types';

const initialState: InitialState = {
  nameUser: '',
  password: '',
  stateForm: 'INITIAL',
  errors: {
    nameUser: '',
    password: '',
  },
};

const formReducer = (state: InitialState, action: FormAction) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.name]: action.value };

    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.nameError]: action.message },
      };

    case 'CLEAN_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.nameError]: '' },
      };
    case 'SET_STATE_FORM':
      return {
        ...state,
        stateForm: action.newState,
      };
    default:
      return initialState;
  }
};

const FormUser: React.FC<PropsFormUser> = ({
  typeForm,
  mutation,
  onSuccess,
  onError,
}) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const queryClient = useQueryClient();
  const {
    data,
    isLoading,
    mutate: mutateCreatePerson,
  } = useMutation<{ personId: string }>(
    'createNewPerson',
    () => ApiFace.createNewPerson({ personId: state.nameUser }),
    {
      onSuccess: (data) => {
        onSuccess({ personId: data.personId });
      },
      onError: () => {
        onError();
      },
    }
  );
  console.log({ data });

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: 'SET_STATE_FORM',
      newState: 'LOADING',
    });

    //create a new person
    mutateCreatePerson();
  };

  const validateName = useCallback(
    debounce(async (nameUser: string) => {
      if (!nameUser) {
        dispatch({
          type: 'SET_ERROR',
          nameError: 'nameUser',
          message: 'Campo requerido',
        });
        return;
      }

      const data = await queryClient.fetchQuery('finByUser', () =>
        Auth.findByUsuario(nameUser)
      );

      if (data) {
        //add the error
        dispatch({
          type: 'SET_ERROR',
          nameError: 'nameUser',
          message: 'El nombre no se encuentra disponible.',
        });
      } else {
        //clean the error
        dispatch({
          type: 'CLEAN_ERROR',
          nameError: 'nameUser',
        });
      }
    }, 300),
    []
  );

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    dispatch({
      type: 'SET_FIELD',
      name,
      value,
    });

    if (name === 'nameUser') {
      //Validate input password
      validateName(value);
    }

    if (name === 'password') {
      //Validate input password
      validatePassword(name, value);
    }
  };

  const validatePassword = (name: string, value: string) => {
    if (!value) {
      dispatch({
        type: 'SET_ERROR',
        nameError: name,
        message: 'Campo requerido',
      });
      return;
    }

    if (value.length < 6) {
      dispatch({
        type: 'SET_ERROR',
        nameError: name,
        message: 'Tu contraseña debe de tener al menos 6 caracteres',
      });
    } else {
      dispatch({
        type: 'CLEAN_ERROR',
        nameError: name,
      });
    }
  };

  const handleOnSubmitDisabled = () => {
    if (
      !state.errors.nameUser &&
      !state.errors.password &&
      state.nameUser &&
      state.password
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <form className="flex flex-col w-full mt-4" onSubmit={handleOnSubmit}>
      <FormField
        name="nameUser"
        textLabel="Nombre"
        value={state.nameUser}
        onChange={handleChangeInput}
        errorMessage={state.errors.nameUser}
      />
      <FormField
        name="password"
        textLabel="Contraseña"
        value={state.password}
        onChange={handleChangeInput}
        errorMessage={state.errors.password}
      />
      <Btn isDisabled={handleOnSubmitDisabled() || isLoading} />
    </form>
  );
};

export default FormUser;
