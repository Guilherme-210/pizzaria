'use server';

import { apiClient } from '@/lib/api';
import { getAccessToken } from '@/lib/cookies/authCookies';
import { User, userRoles } from '@/lib/types/user.types';
import { redirect } from 'next/navigation';

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
