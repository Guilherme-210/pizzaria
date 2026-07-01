'use server';

import { apiClient } from '@/lib/api';
import {
  UserLogin,
  UserLoginPayload,
  UserRegister,
  UserRegisterPayload,
} from '@/lib/types/user.types';
import { cookies } from 'next/headers';

type RegisterState = {
  success: boolean;
  error: string | null;
  redirectTo?: string;
};

export async function registerAction(
  _prevState: RegisterState | null,
  formData: FormData,
): Promise<RegisterState> {
  try {
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const password = String(formData.get('password') || '');
    const confirmPassword = String(formData.get('confirmPassword') || '');

    if (!name || !email || !password || !confirmPassword) {
      return { success: false, error: 'Preencha todos os campos.' };
    }

    if (password.length < 6) {
      return {
        success: false,
        error: 'A senha deve ter no mínimo 6 caracteres.',
      };
    }

    if (password !== confirmPassword) {
      return { success: false, error: 'As senhas não coincidem.' };
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

export async function loginAction(
  _prevState: LoginState | null,
  formData: FormData,
): Promise<LoginState> {
  try {
    const email = String(formData.get('email') || '').trim();
    const password = String(formData.get('password') || '');

    if (!email || !password) {
      return { success: false, error: 'Preencha e-mail e senha.' };
    }

    const data: UserLoginPayload = {
      email,
      password,
    };

    const user = await apiClient<UserLogin>('/users/session', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    const cookieStore = await cookies();

    cookieStore.set('auth-token', user.token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
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
