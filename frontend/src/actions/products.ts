'use server';

import { apiClient } from '@/lib/api';
import { getAccessToken } from '@/lib/cookies/authCookies';
import { Produto } from '@/lib/types/product.types';
import { revalidatePath } from 'next/cache';

const PRODUCTS_PATH = '/admin/produtos';

function getProductPayload(formData: FormData) {
  const price = Number(String(formData.get('price')).replace(',', '.'));

  return {
    name: String(formData.get('name')).trim(),
    price: Math.round(price * 100),
    description: String(formData.get('description')).trim(),
    banner: String(formData.get('banner')).trim(),
    category_id: String(formData.get('category_id')),
  };
}

export async function createProdutoAction(formData: FormData) {
  try {
    const token = await getAccessToken();

    await apiClient<Produto>('/product', {
      method: 'POST',
      token,
      body: JSON.stringify(getProductPayload(formData)),
    });

    revalidatePath(PRODUCTS_PATH);

    return { success: true, message: 'Produto criado com sucesso.' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }

    return { success: false, message: 'Erro ao criar o produto.' };
  }
}

export async function editProdutoAction(formData: FormData, id: string) {
  try {
    const token = await getAccessToken();

    await apiClient<Produto>(`/product/${id}`, {
      method: 'PUT',
      token,
      body: JSON.stringify(getProductPayload(formData)),
    });

    revalidatePath(PRODUCTS_PATH);

    return { success: true, message: 'Produto atualizado com sucesso.' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }

    return { success: false, message: 'Erro ao atualizar o produto.' };
  }
}

export async function setProdutoDisabledAction(id: string, disabled: boolean) {
  try {
    const token = await getAccessToken();

    await apiClient<Produto>(`/product/${id}`, {
      method: 'PATCH',
      token,
      body: JSON.stringify({ disabled }),
    });

    revalidatePath(PRODUCTS_PATH);

    return {
      success: true,
      message: disabled
        ? 'Produto desativado com sucesso.'
        : 'Produto ativado com sucesso.',
    };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }

    return { success: false, message: 'Erro ao atualizar o produto.' };
  }
}

export async function deleteProdutoAction(id: string) {
  try {
    const token = await getAccessToken();

    await apiClient<unknown>(`/product/${id}`, {
      method: 'DELETE',
      token,
    });

    revalidatePath(PRODUCTS_PATH);

    return { success: true, message: 'Produto desativado com sucesso.' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }

    return { success: false, message: 'Erro ao desativar o produto.' };
  }
}
