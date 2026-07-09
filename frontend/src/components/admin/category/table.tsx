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
import { Categoria } from '@/lib/types/category.types';
import { PencilIcon, PlusIcon } from 'lucide-react';

export default async function CategoriasTable({
  categorias,
}: {
  categorias: Categoria[];
}) {
  return (
    <>
      <Card className="min-w-full max-w-sm ">
        <CardHeader className="flex sm:flex-row flex-col justify-between gap-2 pb-6 mb-3">
          <CardTitle className="text-lg font-semibold">
            Categorias cadastradas
          </CardTitle>
          <CardAction>
            <Button type="button" variant="outline">
              Adicionar Categoria
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

                    <TableCell>true</TableCell>

                    <TableCell className="flex flex-row justify-end gap-2 w-auto">
                      <Button className="p-4 m-0">
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
    </>
  );
}
