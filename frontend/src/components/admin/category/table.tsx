'use client';

import { deleteCategoriaAction } from '@/actions/categories';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import { Categoria } from '@/lib/types/category.types';
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';

export default function CategoriasTable({
  categorias,
  setIsCreating,
  setIsEditing,
  setEditingId,
  confirmDelete,
  setConfirmDelete,
}: {
  categorias: Categoria[];
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingId: React.Dispatch<React.SetStateAction<string>>;
  confirmDelete: boolean;
  setConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [categoryId, setcategoryId] = useState<string>('');

  async function handleDeleteCategoria() {
    let result = { success: false, message: 'Execução cancelada' };
    try {
      if (!confirmDelete) {
        result = await deleteCategoriaAction(categoryId);

        return { success: result.success, message: result.message };
      }
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, message: error.message };
      }

      return {
        success: false,
        message: 'Erro ao deletar a categoria.',
      };
    } finally {
      setOpen(false);
      setConfirmDelete(false);
      setcategoryId('');
      setEditingId('');
    }
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
                      {categoria._count.products > 0 ? 'Ativo' : 'Inativo'}
                    </TableCell>

                    <TableCell className="flex flex-row justify-end gap-2 w-auto">
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

                      <Button
                        className="p-4 m-0"
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          setOpen(true);
                          setcategoryId(categoria.id.toString());
                        }}
                      >
                        <TrashIcon className="h-3 w-4" />
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
                Tem certeza que deseja deletar esta categoria?
              </DialogTitle>
              <DialogDescription>
                Esta ação não pode ser desfeita. Todos os produtos associados a
                esta categoria serão afetados.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>Cancelar</DialogClose>
              <Button variant="destructive" onClick={handleDeleteCategoria}>
                Deletar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
