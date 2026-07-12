'use client';

import {
  deleteCategoriaAction,
  setCategoriaActiveAction,
} from '@/actions/categories';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Categoria } from '@/lib/types/category.types';
import { PencilIcon, PlusIcon, PowerIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CategoriasTable({
  categorias,
  setIsCreating,
  setIsEditing,
  setEditingId,
}: {
  categorias: Categoria[];
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingId: React.Dispatch<React.SetStateAction<string>>;
}) {
  const router = useRouter();
  const [isOpen, setOpen] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<string>('');
  const [deleteError, setDeleteError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDeleteCategoria() {
    if (!categoryId) {
      setDeleteError('Categoria inválida.');
      return;
    }

    setDeleteError('');
    setIsDeleting(true);

    const result = await deleteCategoriaAction(categoryId);

    setIsDeleting(false);

    if (!result.success) {
      setDeleteError(result.message);
      return;
    }

    setOpen(false);
    setCategoryId('');
    setEditingId('');
    router.refresh();
  }

  async function handleActivateCategoria(id: string) {
    const result = await setCategoriaActiveAction(id, true);

    if (!result.success) {
      setDeleteError(result.message);
      return;
    }

    router.refresh();
  }

  return (
    <>
      <Card className="min-w-full max-w-sm ">
        <CardHeader className="flex sm:flex-row flex-col justify-between gap-2 pb-6 mb-3">
          <CardTitle className="text-lg font-semibold">
            Categorias cadastradas
          </CardTitle>
          <CardAction>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCreating(true)}
            >
              Criar Categoria
              <PlusIcon className="h-5 w-5 font-bold" />
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <Table>
            <TableCaption>Lista de categorias cadastradas.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">Nome</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>

            {categorias.length === 0 ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Nenhuma categoria cadastrada.
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {categorias.map((categoria) => (
                  <TableRow className="" key={categoria.id}>
                    <TableCell className="font-medium">
                      {categoria.name}
                    </TableCell>

                    <TableCell>{categoria._count.products}</TableCell>

                    <TableCell>
                      {categoria.active ? 'Ativo' : 'Inativo'}
                    </TableCell>

                    <TableCell className="flex flex-row justify-end gap-2 w-auto">
                      <Button
                        className="p-4 m-0"
                        variant={categoria.active ? 'destructive' : 'outline'}
                        onClick={() => {
                          if (categoria.active) {
                            setOpen(true);
                            setCategoryId(categoria.id);
                            setDeleteError('');
                            return;
                          }

                          handleActivateCategoria(categoria.id);
                        }}
                      >
                        {categoria.active ? 'Desativar' : 'Ativar'}
                        <PowerIcon className="ml-2 h-3 w-4" />
                      </Button>

                      <Button
                        className="p-4 m-0"
                        onClick={() => {
                          setIsEditing(true);
                          setEditingId(categoria.id.toString());
                        }}
                      >
                        Editar
                        <PencilIcon className="ml-2 h-3 w-4" />
                      </Button>

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </CardContent>
      </Card>

      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-md space-y-4">
            <DialogHeader>
              <DialogTitle>
                Tem certeza que deseja desativar esta categoria?
              </DialogTitle>
              <DialogDescription>
                A categoria não aparecerá no cardápio. Os produtos e o histórico
                de pedidos serão preservados.
              </DialogDescription>
            </DialogHeader>
            {deleteError && (
              <p className="text-sm text-red-500" role="alert">
                {deleteError}
              </p>
            )}
            <DialogFooter>
              <DialogClose>Cancelar</DialogClose>
              <Button
                variant="destructive"
                onClick={handleDeleteCategoria}
                disabled={isDeleting}
              >
                {isDeleting ? 'Desativando...' : 'Desativar'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
