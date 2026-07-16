'use client';

import { getProductsByCategoryAction } from '@/actions/categories';
import { setProdutoDisabledAction } from '@/actions/products';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Produto } from '@/lib/types/product.types';
import { Categoria } from '@/lib/types/category.types';
import {
  ArrowDownAZ,
  ArrowDownNarrowWide,
  ArrowUpAZ,
  ArrowUpNarrowWide,
  Pencil,
  Plus,
  Power,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function formatPrice(price: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price / 100);
}

type SortField = 'name' | 'price' | 'category';
type SortDirection = 'asc' | 'desc';

function SortButton({
  field,
  label,
  sortField,
  sortDirection,
  onSort,
}: {
  field: SortField;
  label: string;
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}) {
  const isActive = sortField === field;
  const Icon =
    field === 'price'
      ? sortDirection === 'asc'
        ? ArrowUpNarrowWide
        : ArrowDownNarrowWide
      : sortDirection === 'asc'
        ? ArrowUpAZ
        : ArrowDownAZ;

  return (
    <button
      type="button"
      className="inline-flex items-center gap-1 text-left transition-colors hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
      onClick={() => onSort(field)}
      aria-label={`Ordenar por ${label.toLowerCase()}${isActive ? sortDirection === 'asc' ? ', crescente' : ', decrescente' : ''}`}
    >
      {label}
      {isActive && <Icon className="size-3.5" aria-hidden="true" />}
    </button>
  );
}

export default function ProductsTable({
  produtos,
  categorias,
  onCreate,
  onEdit,
}: {
  produtos: Produto[];
  categorias: Categoria[];
  onCreate: () => void;
  onEdit: (produto: Produto) => void;
}) {
  const router = useRouter();
  const [productToChangeStatus, setProductToChangeStatus] =
    useState<Produto | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [statusError, setStatusError] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [displayedProducts, setDisplayedProducts] = useState(produtos);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [filterError, setFilterError] = useState('');

  const sortedProducts = useMemo(() => {
    return [...displayedProducts].sort((firstProduct, secondProduct) => {
      const firstValue =
        sortField === 'category'
          ? firstProduct.category.name
          : firstProduct[sortField];
      const secondValue =
        sortField === 'category'
          ? secondProduct.category.name
          : secondProduct[sortField];
      const comparison =
        typeof firstValue === 'number' && typeof secondValue === 'number'
          ? firstValue - secondValue
          : String(firstValue).localeCompare(String(secondValue), 'pt-BR');

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [displayedProducts, sortDirection, sortField]);

  async function handleCategoryChange(categoryId: string) {
    setSelectedCategoryId(categoryId);
    setFilterError('');

    if (categoryId === 'all') {
      setDisplayedProducts(produtos);
      return;
    }

    setIsLoadingProducts(true);
    const result = await getProductsByCategoryAction(categoryId);
    setIsLoadingProducts(false);

    if (!result.success) {
      setFilterError(result.message ?? 'Erro ao buscar os produtos da categoria.');
      return;
    }

    setDisplayedProducts(result.products);
  }

  function handleSort(field: SortField) {
    if (field === sortField) {
      setSortDirection((currentDirection) =>
        currentDirection === 'asc' ? 'desc' : 'asc',
      );
      return;
    }

    setSortField(field);
    setSortDirection('asc');
  }

  async function handleStatusChange(id: string, disabled: boolean) {
    setStatusError('');
    setIsUpdatingStatus(true);

    const result = await setProdutoDisabledAction(id, disabled);

    setIsUpdatingStatus(false);

    if (!result.success) {
      setStatusError(result.message);
      return;
    }

    setProductToChangeStatus(null);
    router.refresh();
  }

  return (
    <>
      <section className="space-y-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Produtos
            </h1>
            <p className="mt-1 text-sm text-white/60">
              Gerencie o cardápio da pizzaria.
            </p>
          </div>

          <Button className="h-9 rounded-md px-3 text-xs" onClick={onCreate}>
            <Plus className="size-4" />
            Novo produto
          </Button>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label
            htmlFor="products-category-filter"
            className="text-sm font-medium text-white/75"
          >
            Categoria
          </label>
          <Select
            value={selectedCategoryId}
            onValueChange={handleCategoryChange}
            disabled={isLoadingProducts}
          >
            <SelectTrigger id="products-category-filter" className="w-full sm:w-64">
              <SelectValue placeholder="Todas as categorias" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {categorias.map((categoria) => (
                <SelectItem key={categoria.id} value={categoria.id}>
                  {categoria.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-white/55">
            {isLoadingProducts
              ? 'Buscando produtos...'
              : `${sortedProducts.length} ${
                  sortedProducts.length === 1
                    ? 'produto encontrado'
                    : 'produtos encontrados'
                }`}
          </p>
        </div>

        {filterError && (
          <p className="text-sm text-destructive" role="alert">
            {filterError}
          </p>
        )}

        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111728] shadow-[0_16px_40px_rgba(0,0,0,0.2)]">
          <Table className="min-w-[760px]">
            <TableHeader className="bg-white/[0.02]">
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="px-4 text-xs font-semibold text-white">
                  Imagem
                </TableHead>
                <TableHead className="text-xs font-semibold text-white">
                  <SortButton
                    field="name"
                    label="Nome"
                    sortField={sortField}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                  />
                </TableHead>
                <TableHead className="text-xs font-semibold text-white">
                  <SortButton
                    field="price"
                    label="Preço"
                    sortField={sortField}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                  />
                </TableHead>
                <TableHead className="text-xs font-semibold text-white">
                  <SortButton
                    field="category"
                    label="Categoria"
                    sortField={sortField}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                  />
                </TableHead>
                <TableHead className="text-xs font-semibold text-white">
                  Descrição
                </TableHead>
                <TableHead className="px-4 text-right text-xs font-semibold text-white">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {sortedProducts.length === 0 ? (
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableCell
                    colSpan={6}
                    className="px-4 py-10 text-center text-sm text-white/55"
                  >
                    {selectedCategoryId === 'all'
                      ? 'Nenhum produto cadastrado.'
                      : 'Nenhum produto encontrado nesta categoria.'}
                  </TableCell>
                </TableRow>
              ) : (
                sortedProducts.map((produto) => (
                  <TableRow
                    key={produto.id}
                    className="border-white/10 text-white/80 hover:bg-white/[0.03]"
                  >
                    <TableCell className="px-4 py-3">
                      <div
                        className="size-10 overflow-hidden rounded-md border border-white/10 bg-white/5 bg-cover bg-center"
                        style={
                          produto.banner
                            ? { backgroundImage: `url(${produto.banner})` }
                            : undefined
                        }
                        aria-label={`Imagem de ${produto.name}`}
                        role="img"
                      />
                    </TableCell>
                    <TableCell className="font-medium text-white">
                      {produto.name}
                    </TableCell>
                    <TableCell className="font-medium text-brand-primary">
                      {formatPrice(produto.price)}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex rounded-full border border-white/15 px-3 py-0.5 text-xs text-white/70">
                        {produto.category.name}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-56 truncate text-white/65">
                      {produto.description}
                    </TableCell>
                    <TableCell className="px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="rounded-md px-3 text-xs"
                          onClick={() => onEdit(produto)}
                        >
                          <Pencil className="size-3.5" />
                          Editar
                        </Button>
                        <Button
                          type="button"
                          variant={produto.disabled ? 'outline' : 'destructive'}
                          size="sm"
                          className="rounded-md px-3 text-xs"
                          onClick={() => {
                            setStatusError('');

                            if (produto.disabled) {
                              handleStatusChange(produto.id, false);
                              return;
                            }

                            setProductToChangeStatus(produto);
                          }}
                        >
                          <Power className="size-3.5" />
                          {produto.disabled ? 'Ativar' : 'Desativar'}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </section>

      <Dialog
        open={productToChangeStatus !== null}
        onOpenChange={(open) => {
          if (!open && !isUpdatingStatus) setProductToChangeStatus(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Desativar produto?</DialogTitle>
            <DialogDescription>
              O produto &quot;{productToChangeStatus?.name}&quot; será desativado e não
              aparecerá mais no cardápio.
            </DialogDescription>
          </DialogHeader>

          {statusError && (
            <p className="text-sm text-destructive" role="alert">
              {statusError}
            </p>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isUpdatingStatus}>
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                if (productToChangeStatus) {
                  handleStatusChange(productToChangeStatus.id, true);
                }
              }}
              disabled={isUpdatingStatus}
            >
              {isUpdatingStatus ? 'Desativando...' : 'Desativar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
