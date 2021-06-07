import { UserResponse } from '@Types';

export interface PropsFormUser {
  typeForm: 'login' | 'register';
  onSuccess?: ({ usuario, contraseña, personId }: UserResponse) => void;
  onError?: () => void;
}

export type StateForm = 'INITIAL' | 'READYFORCONTINUE' | 'LOADING' | 'ERROR';

export interface InitialState {
  nameUser: string;
  password: string;
  stateForm: StateForm;
  errors: {
    nameUser: string;
    password: string;
  };
}

export type FormAction =
  | {
      type: 'SET_FIELD';
      name: string;
      value: string;
    }
  | {
      type: 'SET_ERROR';
      nameError: string;
      message: string;
    }
  | {
      type: 'CLEAN_ERROR';
      nameError: string;
    }
  | {
      type: 'SET_STATE_FORM';
      newState: StateForm;
    };
