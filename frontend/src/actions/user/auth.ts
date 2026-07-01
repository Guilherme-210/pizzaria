'use server';

import { apiClient } from '@/lib/api';
import {
  User,
  UserLogin,
  UserLoginPayload,
  UserRegister,
  UserRegisterPayload,
} from '@/lib/types/user.types';

type RegisterState = {
  success: boolean;
  error: string | null;
  redirectTo?: string;
};

export async function registerAction(
  prevState: RegisterState | null,
  formData: FormData,
): Promise<RegisterState> {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

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
      return { success: false, error: error.message };
    } else {
      return {
        success: false,
        error: 'Ocorreu um erro ao registrar o usuário.',
      };
    }
  }
}

type LoginState = {
  success: boolean;
  error: string | null;
  redirectTo?: string;
};

export async function LoginAction(
  prevState: LoginState | null,
  formData: FormData,
): Promise<LoginState> {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const data: UserLoginPayload = {
      email,
      password,
    };

    await apiClient<UserLogin>('/users/session', {
      method: 'POST',
      body: JSON.stringify(data),
    });


    return { success: true, error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: 'Ocorreu um erro ao fazer login.' };
    }
  }
}
