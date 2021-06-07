export interface UserLocalStorage {
  usuario: string;
  userId: string;
  personId: string;
}
export interface UserResponse {
  _id: string;
  usuario: string;
  contraseña: string;
  personId: string;
  __v: number;
}

export interface UserLogin {
  usuario: string;
  contraseña: string;
}

export interface UserRegister {
  usuario: string;
  contraseña: string;
  personId: string;
}
