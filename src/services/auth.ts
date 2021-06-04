import { fetcher } from '@Utils';
import { User } from '@Types';

export type UserAuthData = {
  email: string;
  password: string;
};

export type AuthResponse = {
  refreshToken: string;
  statusCode: number;
  token: string;
  user: User;
};

const auth = {
  loginUser: async (data: UserAuthData) => {
    return fetcher<AuthResponse>({
      endpoint: '/auth/login-user/',
      method: 'POST',
      body: data,
    });
  },
  registerUser: async (data: UserAuthData) => {
    return fetcher<AuthResponse>({
      endpoint: '/auth/create-account/',
      method: 'POST',
      body: data,
    });
  },
};

export default auth;
