import { useReducer } from 'react';
import { useMutation } from 'react-query';

import { useContextAuth } from '@Context/contextAuth';
import FormField from './components/FormField';
import Btn from './components/Btn';
import { PropsFormUser, InitialState, FormAction } from './types';

const initialState: InitialState = {
  email: '',
  password: '',
  stateForm: 'INITIAL',
  errors: {
    error: '',
    email: '',
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
  isChecked,
  onSuccess,
  onError,
}) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const { setDataUserLocalStorage } = useContextAuth();

  const { isLoading, isError, error, mutate } = useMutation(
    typeForm,
    () => mutation({ email: state.email, password: state.password }),
    {
      onError: () => {
        dispatch({
          type: 'SET_STATE_FORM',
          newState: 'ERROR',
        });
        onError();
      },
      onSuccess: (data) => {
        dispatch({
          type: 'SET_STATE_FORM',
          newState: 'COMPLETED',
        });

        // setDataUserLocalStorage(userData);
        onSuccess();
      },
    }
  );

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: 'SET_STATE_FORM',
      newState: 'LOADING',
    });

    mutate();
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    dispatch({
      type: 'SET_FIELD',
      name,
      value,
    });

    if (state.errors.error) {
      dispatch({
        type: 'CLEAN_ERROR',
        nameError: 'error',
      });
    }

    if (name === 'email') {
      //Validate input email
      validateEmail(name, value);
    }

    if (name === 'password') {
      //Validate input password
      validatePassword(name, value);
    }
  };

  const validateEmail = (name: string, value: string) => {
    if (!value) {
      dispatch({
        type: 'SET_ERROR',
        nameError: name,
        message: 'Campo requerido',
      });
      return;
    }

    const emailRegex =
      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if (emailRegex.test(value)) {
      dispatch({
        type: 'CLEAN_ERROR',
        nameError: name,
      });
    } else {
      dispatch({
        type: 'SET_ERROR',
        nameError: name,
        message: 'Por favor, ingresa un email válido.',
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
    //el prop isChecked a veces puede ser undefined, en ese momento no nos interesa evaluarlo
    //cuando lleva un valor booleano debemos verificar que sea true para poder habilitar el button
    //entonces si es undefined  o si es true habilitamos el button submit
    if (
      !state.errors.email &&
      !state.errors.password &&
      !state.errors.error &&
      state.email &&
      state.password &&
      !isLoading
    ) {
      if (isChecked === undefined || isChecked === true) {
        return false;
      }

      return true;
    } else return true;
  };

  return (
    <form className="flex flex-col w-full mt-4" onSubmit={handleOnSubmit}>
      <FormField
        name="name"
        textLabel="Nombre"
        value={state.email}
        onChange={handleChangeInput}
        errorMessage={state.errors.email}
      />
      <FormField
        name="password"
        textLabel="Contraseña"
        value={state.password}
        onChange={handleChangeInput}
        errorMessage={state.errors.password}
      />
      {isError ? (
        <span className="text-red-500 text-center font-semibold text-xs my-3">
          {error?.message}
        </span>
      ) : null}
      <Btn isDisabled={handleOnSubmitDisabled() || isLoading} />
    </form>
  );
};

export default FormUser;
