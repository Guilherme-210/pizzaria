export const userRoles = ['user', 'admin'] as const;
export type UserRole = (typeof userRoles)[number];

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface UserLoginPayload {
  email: string;
  password: string;
}
export interface UserLogin {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  token?: string;
}

export interface UserRegisterPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface UserRegister {
  message?: string;
  user?: {
    name: string;
    email: string;
    role: UserRole;
    createdAt: string;
  };
}
