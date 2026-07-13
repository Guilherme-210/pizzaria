'use server';

import { apiClient } from '@/lib/api';
import { getAccessToken } from '@/lib/cookies/authCookies';
import { User, UserRegister, UserRole } from '@/lib/types/user.types';
import { revalidatePath } from 'next/cache';

function getUpdatePayload(formData: FormData) {
  const password = String(formData.get('password') || '');
  const confirmPassword = String(formData.get('confirmPassword') || '');

  return {
    name: String(formData.get('name') || '').trim(),
    email: String(formData.get('email') || '').trim(),
    image: String(formData.get('image') || '').trim() || null,
    role: String(formData.get('role') || '') as UserRole,
    ...(password && { password, confirmPassword }),
  };
}

function getManagedUpdatePayload(formData: FormData) {
  return {
    name: String(formData.get('name') || '').trim(),
    email: String(formData.get('email') || '').trim(),
    active: formData.get('active') === 'true',
    image: String(formData.get('image') || '').trim() || null,
  };
}

export async function updateOwnUserAction(formData: FormData) {
  try {
    const token = await getAccessToken();

    await apiClient<User>('/user', {
      method: 'PATCH',
      token,
      body: JSON.stringify(getUpdatePayload(formData)),
    });

    revalidatePath('/meus-dados');

    return { success: true, message: 'Dados atualizados com sucesso.' };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Erro ao atualizar seus dados.',
    };
  }
}

export async function createManagedUserAction(formData: FormData) {
  try {
    const token = await getAccessToken();
    const password = String(formData.get('password') || '');
    const confirmPassword = String(formData.get('confirmPassword') || '');

    await apiClient<UserRegister>('/users', {
      method: 'POST',
      token,
      body: JSON.stringify({
        name: String(formData.get('name') || '').trim(),
        email: String(formData.get('email') || '').trim(),
        password,
        confirmPassword,
      }),
    });

    revalidatePath('/admin/usuarios');

    return { success: true, message: 'Usuário criado com sucesso.' };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Erro ao criar o usuário.',
    };
  }
}

export async function updateManagedUserAction(formData: FormData, id: string) {
  try {
    const token = await getAccessToken();

    await apiClient<User>(`/management/users/${id}`, {
      method: 'PATCH',
      token,
      body: JSON.stringify(getManagedUpdatePayload(formData)),
    });

    revalidatePath('/admin/usuarios');

    return { success: true, message: 'Usuário atualizado com sucesso.' };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Erro ao atualizar o usuário.',
    };
  }
}

export async function resetManagedUserPasswordAction(id: string) {
  try {
    const token = await getAccessToken();

    const response = await apiClient<{ message: string; password: string }>(`/management/users/${id}/reset-password`, {
      method: 'PATCH',
      token,
    });

    return { success: true, message: response.message, password: response.password };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Erro ao redefinir a senha.',
    };
  }
}
