import { fetcher } from '@Utils';
import { UserForm } from '@Types';

export interface ResponseAddUser {
  mensaje: string;
  userId: string;
  usuario: string;
}

const auth = {
  AddUser: async (user: UserForm) => {
    return fetcher<ResponseAddUser>({
      endpoint: '/usuario',
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
