import { fetcher } from '@Utils';
import { UserLogin, UserRegister, UserResponse } from '@Types';

const auth = {
  loginUser: async (user: UserLogin) => {
    return fetcher<UserResponse>({
      endpoint: '/login',
      method: 'POST',
      body: user,
    });
  },
  registerUser: async (user: UserRegister) => {
    return fetcher<UserResponse>({
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
