import CategoriasTable from '@/components/admin/category/table';
import { apiClient } from '@/lib/api';
import { getAccessToken } from '@/lib/cookies/authCookies';
import { Categoria } from '@/lib/types/category.types';

export default async function CategoriasPage() {
  const token = await getAccessToken();
  const categorias = await apiClient<Categoria[]>('/categories', {
    token,
  });

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Categorias</h1>
        <p className="text-gray-600">Gerencie categorias do cardapio.</p>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <CategoriasTable categorias={categorias} />
      </div>
    </div>
  );
}
