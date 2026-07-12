'use server';

import { apiClient } from '@/lib/api';
import { getAccessToken } from '@/lib/cookies/authCookies';
import { Categoria } from '@/lib/types/category.types';
import { revalidatePath } from 'next/cache';

const CATEGORIES_PATH = '/admin/categorias';

export async function createCategoriaAction(formData: FormData) {
  try {
    const token = await getAccessToken();
    const name = formData.get('name') as string;

    await apiClient<Categoria>('/category', {
      method: 'POST',
      token,
      body: JSON.stringify({ name }),
    });

    revalidatePath(CATEGORIES_PATH);

    return { success: true, message: 'Categoria criada com sucesso.' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }

    return { success: false, message: 'Erro ao criar a categoria.' };
  }
}

export async function editCategoriaAction(formData: FormData, id: string) {
  try {
    const token = await getAccessToken();
    const name = formData.get('name') as string;

    await apiClient<Categoria>(`/category/${id}`, {
      method: 'PUT',
      token,
      body: JSON.stringify({ name }),
    });

    revalidatePath(CATEGORIES_PATH);

    return { success: true, message: 'Categoria editada com sucesso.' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }

    return { success: false, message: 'Erro ao editar a categoria.' };
  }
}

export async function deleteCategoriaAction(id: string) {
  try {
    const token = await getAccessToken();

    await apiClient<unknown>(`/category/${id}`, {
      method: 'DELETE',
      token,
    });

    revalidatePath(CATEGORIES_PATH);

    return { success: true, message: 'Categoria desativada com sucesso.' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }

    return { success: false, message: 'Erro ao desativar a categoria.' };
  }
}

export async function setCategoriaActiveAction(id: string, active: boolean) {
  try {
    const token = await getAccessToken();

    await apiClient<Categoria>(`/category/${id}`, {
      method: 'PATCH',
      token,
      body: JSON.stringify({ active }),
    });

    revalidatePath(CATEGORIES_PATH);

    return {
      success: true,
      message: active
        ? 'Categoria ativada com sucesso.'
        : 'Categoria desativada com sucesso.',
    };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }

    return { success: false, message: 'Erro ao atualizar a categoria.' };
  }
}
