import { fetcher } from '@Utils';
import { UserLogin, UserRegister } from '@Types';

export interface ResponseAddUser {
  mensaje: string;
  userId: string;
  usuario: string;
}

const auth = {
  loginUser: async (user: UserLogin) => {
    return fetcher<ResponseAddUser>({
      endpoint: '/login',
      method: 'POST',
      body: user,
    });
  },
  registerUser: async (user: UserRegister) => {
    return fetcher<ResponseAddUser>({
      endpoint: '/register',
      method: 'POST',
      body: user,
    });
  },
  findByUsuario: async (usuario: string) => {
    return fetcher({
      endpoint: `/usuario/${usuario}`,
      method: 'GET',
    });
  },
};

export default auth;
