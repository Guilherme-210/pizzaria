export const userRoles = [
  'CUSTOMER',
  'ATTENDANT',
  'KITCHEN',
  'MANAGER',
  'ADMIN',
  'SUPER_ADMIN',
] as const;
export type UserRole = (typeof userRoles)[number];

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface UserLoginPayload {
  email: string;
  password: string;
}
export interface UserLogin {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  token: string;
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
