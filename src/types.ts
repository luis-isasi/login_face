export interface UserLocalStorage {
  usuario: string;
  userId: string;
  personId: string;
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
