'use server';

import { cookies } from 'next/headers';
import { COOKIE_NAME } from './constants';
import { COOKIE_OPTIONS } from './options';

export async function getAccessToken(): Promise<string | undefined> {
  const cookieStore = await cookies();

  return cookieStore.get(COOKIE_NAME.AUTH_ACCESS_TOKEN)?.value;
}

export async function setAccessToken(token: string) {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME.AUTH_ACCESS_TOKEN, token, COOKIE_OPTIONS);
}

export async function removeAccessToken() {
  const cookieStore = await cookies();

  cookieStore.delete(COOKIE_NAME.AUTH_ACCESS_TOKEN);
}
