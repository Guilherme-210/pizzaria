'use server';

import { cookies } from 'next/headers';
import { COOKIE_NAME } from './constants';
import { COOKIE_OPTIONS } from './options';

/**
 * Retorna o token de acesso armazenado nos cookies.
 *
 * @returns O token de acesso, se existir.
 */
export async function getAccessToken(): Promise<string | undefined> {
  const cookieStore = await cookies();

  return cookieStore.get(COOKIE_NAME.AUTH_ACCESS_TOKEN)?.value;
}

/**
 * Salva o token de acesso nos cookies.
 *
 * @param token Token de acesso retornado pela API.
 */
export async function setAccessToken(token: string) {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME.AUTH_ACCESS_TOKEN, token, COOKIE_OPTIONS);
}

/**
 * Remove o token de acesso armazenado nos cookies.
 */
export async function removeAccessToken() {
  const cookieStore = await cookies();

  cookieStore.delete(COOKIE_NAME.AUTH_ACCESS_TOKEN);
}
