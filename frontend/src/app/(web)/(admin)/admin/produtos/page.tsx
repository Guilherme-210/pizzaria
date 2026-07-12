import ContentProdutosPage from '@/components/admin/product/content-page';
import { apiClient } from '@/lib/api';
import { getAccessToken } from '@/lib/cookies/authCookies';
import { Produto } from '@/lib/types/product.types';
import { Categoria } from '@/lib/types/category.types';

export default async function ProdutosPage() {
  const token = await getAccessToken();
  const [produtos, categorias] = await Promise.all([
    apiClient<Produto[]>('/products', { token }),
    apiClient<Categoria[]>('/categories', { token }),
  ]);

  return (
    <ContentProdutosPage produtos={produtos} categorias={categorias} />
  );
}
