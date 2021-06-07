import { fetcher } from '@Utils';
import { UserLogin, UserRegister } from '@Types';

export interface ResponseUser {
  _id: string;
  usuario: string;
  contraseña: string;
  personId: string;
  __v: number;
}

const auth = {
  loginUser: async (user: UserLogin) => {
    return fetcher<ResponseUser>({
      endpoint: '/login',
      method: 'POST',
      body: user,
    });
  },
  registerUser: async (user: UserRegister) => {
    return fetcher<ResponseUser>({
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
