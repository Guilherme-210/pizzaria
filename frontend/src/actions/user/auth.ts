'use server';

import { apiClient } from '@/lib/api';
import { getAccessToken, setAccessToken } from '@/lib/cookies/authCookies';
import {
  User,
  UserLogin,
  UserLoginPayload,
  UserRegister,
  UserRegisterPayload,
  userRoles,
} from '@/lib/types/user.types';
import { redirect } from 'next/navigation';

type RegisterState = {
  success: boolean;
  error: string | null;
  redirectTo?: string;
  fields?: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
};

export async function registerAction(
  _prevState: RegisterState | null,
  formData: FormData,
): Promise<RegisterState> {
  let name = '';
  let email = '';
  let password = '';
  let confirmPassword = '';

  try {
    name = String(formData.get('name') || '').trim();
    email = String(formData.get('email') || '').trim();
    password = String(formData.get('password') || '');
    confirmPassword = String(formData.get('confirmPassword') || '');

    if (!name || !email || !password || !confirmPassword) {
      return {
        success: false,
        error: 'Preencha todos os campos.',
        fields: { name, email, password, confirmPassword },
      };
    }

    if (password.length < 6) {
      return {
        success: false,
        error: 'A senha deve ter no mínimo 6 caracteres.',
        fields: { name, email, password, confirmPassword },
      };
    }

    if (password !== confirmPassword) {
      return {
        success: false,
        error: 'As senhas não coincidem.',
        fields: { name, email, password, confirmPassword },
      };
    }

    const data: UserRegisterPayload = {
      name,
      email,
      password,
      confirmPassword,
    };

    await apiClient<UserRegister>('/users', {
      body: JSON.stringify(data),
      method: 'POST',
    });

    return { success: true, error: null, redirectTo: '/login' };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
        fields: { name, email, password, confirmPassword },
      };
    } else {
      return {
        success: false,
        error: 'Ocorreu um erro ao registrar o usuário.',
        fields: { name, email, password, confirmPassword },
      };
    }
  }
}

type LoginState = {
  success: boolean;
  error: string | null;
  redirectTo?: string;
  fields?: {
    email?: string;
    password?: string;
  };
};

export async function loginAction(
  _prevState: LoginState | null,
  formData: FormData,
): Promise<LoginState> {
  let email = '';
  let password = '';

  try {
    email = String(formData.get('email') || '').trim();
    password = String(formData.get('password') || '');

    if (!email || !password) {
      return {
        success: false,
        error: 'Preencha e-mail e senha.',
        fields: { email, password },
      };
    }

    const data: UserLoginPayload = {
      email,
      password,
    };

    const user = await apiClient<UserLogin>('/user/session', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    await setAccessToken(user.token);

    return { success: true, error: null };
  } catch (error) {
    const fields = { email, password };

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message || 'Ocorreu um erro ao fazer login.',
        fields,
      };
    } else {
      return {
        success: false,
        error: 'Ocorreu um erro ao fazer login.',
        fields,
      };
    }
  }
}

export async function getUser(): Promise<User | null> {
  try {
    const token = await getAccessToken();

    if (!token) {
      return null;
    }

    const user = await apiClient<User>('/me', {
      token: token,
    });

    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export async function requireUser(
  roles: (typeof userRoles)[number][],
): Promise<User> {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  if (!roles.includes(user.role)) {
    redirect('/access-denied');
  }

  return user;
}

export async function requireKitchenUser(): Promise<User> {
  const user = await getUser();

  const roles: (typeof userRoles)[number][] = [
    'ATTENDANT',
    'KITCHEN',
    'MANAGER',
    'ADMIN',
    'SUPER_ADMIN',
  ];

  if (!user) {
    redirect('/login');
  }

  if (!roles.includes(user.role)) {
    redirect('/access-denied');
  }

  return user;
}

export async function requireAdminUser(): Promise<User> {
  const user = await getUser();

  const roles: (typeof userRoles)[number][] = [
    'MANAGER',
    'ADMIN',
    'SUPER_ADMIN',
  ];

  if (!user) {
    redirect('/login');
  }

  if (!roles.includes(user.role)) {
    redirect('/access-denied');
  }

  return user;
}
