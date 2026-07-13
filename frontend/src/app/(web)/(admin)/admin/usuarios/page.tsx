import ContentUsuariosPage from '@/components/admin/user/content-page';
import { apiClient } from '@/lib/api';
import { getAccessToken } from '@/lib/cookies/authCookies';
import { requireUser } from '@/lib/auth';
import { User } from '@/lib/types/user.types';

export default async function UsuariosPage() {
  await requireUser(['ADMIN', 'SUPER_ADMIN']);
  const token = await getAccessToken();
  const users = await apiClient<User[]>('/users', { token });

  return (
    <ContentUsuariosPage users={users} />
  );
}
