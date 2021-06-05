import { fetcher } from '@Utils';

export type UserAuthData = {
  email: string;
  password: string;
};

const auth = {
  AddUser: async (data: UserAuthData) => {
    return fetcher({
      endpoint: '/usuario',
      method: 'POST',
      body: data,
    });
  },
  findByUsuario: async (user: string) => {
    return fetcher({
      endpoint: `/usuario/:${user}`,
      method: 'POST',
    });
  },
};

export default auth;
