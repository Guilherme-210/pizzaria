'use server';

import { apiClient } from '@/lib/api';
import { getAccessToken } from '@/lib/cookies/authCookies';
import { Categoria } from '@/lib/types/category.types';

export async function createCategoriaAction(formData: FormData) {
  try {
    const token = await getAccessToken();
    const name = formData.get('name') as string;

    const response = await apiClient<Categoria>('/category', {
      method: 'POST',
      token,
      body: JSON.stringify({ name }),
    });

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

    const response = await apiClient<Categoria>(`/category/${id}`, {
      method: 'PUT',
      token,
      body: JSON.stringify({ name }),
    });

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

    const response = await apiClient<Categoria>(`/category/${id}`, {
      method: 'DELETE',
      token,
    });

    return { success: true, message: 'Categoria deletada com sucesso.' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }

    return { success: false, message: 'Erro ao deletar a categoria.' };
  }
}
