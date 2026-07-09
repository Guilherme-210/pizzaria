import ContentCategoriasPage from '@/components/admin/category/content-page';
import { apiClient } from '@/lib/api';
import { getAccessToken } from '@/lib/cookies/authCookies';
import { Categoria } from '@/lib/types/category.types';

export default async function CategoriasPage() {
  const token = await getAccessToken();
  const categorias = await apiClient<Categoria[]>('/categories', {
    token,
  });

  return (
    <>
      <ContentCategoriasPage categorias={categorias} />
    </>
  );
}
