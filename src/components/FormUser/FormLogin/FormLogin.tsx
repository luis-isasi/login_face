import { useReducer } from 'react';
import { useMutation } from 'react-query';

import Auth from '@Services/auth';
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

const FormLogin: React.FC<PropsFormUser> = ({
  typeForm,
  onSuccess,
  onError,
}) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const {
    isError,
    isLoading,
    error,
    mutate: mutateLogin,
  } = useMutation(
    typeForm,
    () =>
      Auth.loginUser({ usuario: state.nameUser, contraseña: state.password }),
    {
      onSuccess: (data) => {
        onSuccess(data);
      },
      onError: () => {
        onError();
      },
    }
  );

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: 'SET_STATE_FORM',
      newState: 'LOADING',
    });

    mutateLogin();
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    dispatch({
      type: 'SET_FIELD',
      name,
      value,
    });

    if (name === 'nameUser') {
      //Validate input password
      validateName(name, value);
    }

    if (name === 'password') {
      //Validate input password
      validatePassword(name, value);
    }
  };

  const validateName = (name: string, value: string) => {
    if (!value) {
      dispatch({
        type: 'SET_ERROR',
        nameError: name,
        message: 'Campo requerido',
      });
      return;
    } else {
      dispatch({
        type: 'CLEAN_ERROR',
        nameError: name,
      });
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
      {isError && (
        <span className="text-center my-2 text-red-500 font-bold">
          {`${error?.message}`}
        </span>
      )}
      <Btn isDisabled={handleOnSubmitDisabled() || isLoading} />
    </form>
  );
};

export default FormLogin;
