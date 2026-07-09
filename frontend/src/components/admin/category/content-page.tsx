'use client';

import { Categoria } from '@/lib/types/category.types';
import CategoriasTable from './table';
import { useState } from 'react';
import CategoryDialog from './category-dialog';

export default function ContentCategoriasPage({
  categorias,
}: {
  categorias: Categoria[];
}) {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string>('');
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const categoryName =
    categorias.find((cat) => cat.id === editingId)?.name || '';

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Categorias</h1>
        <p className="text-gray-600">Gerencie categorias do cardapio.</p>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <CategoriasTable
          categorias={categorias}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          setEditingId={setEditingId}
          confirmDelete={confirmDelete}
          setConfirmDelete={setConfirmDelete}
        />
      </div>

      <div>
        <CategoryDialog
          categoryName={categoryName}
          isOpen={isCreating || isEditing}
          setOpen={(open) => {
            if (!open) {
              setIsCreating(false);
              setIsEditing(false);
            }
            setEditingId('');
          }}
          editingId={editingId}
        />
      </div>
    </div>
  );
}
