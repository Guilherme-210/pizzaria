'use client';

import { Produto } from '@/lib/types/product.types';
import { Categoria } from '@/lib/types/category.types';
import ProductsTable from './table';
import ProductDialog from './product-dialog';
import { useState } from 'react';

export default function ContentProdutosPage({
  produtos,
  categorias,
}: {
  produtos: Produto[];
  categorias: Categoria[];
}) {
  const [isCreating, setIsCreating] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Produto | null>(null);

  return (
    <div className="w-full">
      <ProductsTable
        produtos={produtos}
        categorias={categorias}
        onCreate={() => setIsCreating(true)}
        onEdit={setEditingProduct}
      />
      <ProductDialog
        isOpen={isCreating || editingProduct !== null}
        setOpen={(open) => {
          if (!open) {
            setIsCreating(false);
            setEditingProduct(null);
          }
        }}
        product={editingProduct}
        categorias={categorias}
      />
    </div>
  );
}
