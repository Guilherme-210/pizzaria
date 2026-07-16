'use client';

import {
  createProdutoAction,
  editProdutoAction,
} from '@/actions/products';
import { Form } from '@/components/forms/form';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Categoria } from '@/lib/types/category.types';
import { Produto } from '@/lib/types/product.types';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

type ProductFormValues = {
  name: string;
  price: number;
  description: string;
  image: FileList;
  category_id: string;
};

export default function ProductDialog({
  isOpen,
  setOpen,
  product,
  categorias,
}: {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  product: Produto | null;
  categorias: Categoria[];
}) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState('');
  const isEditing = product !== null;
  const activeCategorias = categorias.filter((categoria) => categoria.active);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>();

  useEffect(() => {
    if (!isOpen) return;

    reset({
      name: product?.name ?? '',
      price: product ? product.price / 100 : undefined,
      description: product?.description ?? '',
      category_id: product?.category_id ?? '',
    });
    setSubmitError('');
  }, [isOpen, product, reset]);

  function createFormData(data: ProductFormValues) {
    const formData = new FormData();
    formData.append('name', data.name.trim());
    formData.append('price', String(data.price));
    formData.append('description', data.description.trim());
    formData.append('category_id', data.category_id);

    const image = data.image?.item(0);
    if (image) formData.append('image', image);

    return formData;
  }

  async function onSubmit(data: ProductFormValues) {
    setSubmitError('');

    const result = isEditing
      ? await editProdutoAction(createFormData(data), product.id)
      : await createProdutoAction(createFormData(data));

    if (!result.success) {
      setSubmitError(result.message);
      return;
    }

    setOpen(false);
    router.refresh();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Editar' : 'Novo'} produto</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Atualize os dados do produto.' : 'Adicione um produto ao cardápio.'}
          </DialogDescription>
        </DialogHeader>

        <Form id="product-form" className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="product-name">Nome</Label>
              <Input
                id="product-name"
                placeholder="Ex.: Pizza calabresa"
                aria-invalid={Boolean(errors.name)}
                {...register('name', {
                  required: 'Informe o nome do produto.',
                  minLength: { value: 2, message: 'Use ao menos 2 caracteres.' },
                })}
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-price">Preço (R$)</Label>
              <Input
                id="product-price"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0,00"
                aria-invalid={Boolean(errors.price)}
                {...register('price', {
                  valueAsNumber: true,
                  required: 'Informe o preço do produto.',
                  min: { value: 0.01, message: 'O preço deve ser maior que zero.' },
                })}
              />
              {errors.price && <p className="text-sm text-destructive">{errors.price.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-category">Categoria</Label>
              <Controller
                name="category_id"
                control={control}
                rules={{ required: 'Selecione uma categoria.' }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="product-category"
                      className="w-full"
                      aria-invalid={Boolean(errors.category_id)}
                    >
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {activeCategorias.map((categoria) => (
                        <SelectItem key={categoria.id} value={categoria.id}>
                          {categoria.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category_id && <p className="text-sm text-destructive">{errors.category_id.message}</p>}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="product-description">Descrição</Label>
              <textarea
                id="product-description"
                rows={3}
                placeholder="Descreva o produto"
                className="w-full rounded-lg border border-input bg-input/30 px-2.5 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                aria-invalid={Boolean(errors.description)}
                {...register('description', {
                  required: 'Informe a descrição do produto.',
                  minLength: { value: 2, message: 'Use ao menos 2 caracteres.' },
                })}
              />
              {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="product-image">
                Imagem do produto{isEditing ? ' (opcional)' : ''}
              </Label>
              <Input
                id="product-image"
                type="file"
                accept="image/*"
                aria-invalid={Boolean(errors.image)}
                {...register('image', {
                  required: isEditing ? false : 'Selecione uma imagem.',
                })}
              />
              {errors.image && <p className="text-sm text-destructive">{errors.image.message}</p>}
            </div>
          </div>

          {submitError && <p className="text-sm text-destructive" role="alert">{submitError}</p>}
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={isSubmitting}>Cancelar</Button>
          </DialogClose>
          <Button type="submit" form="product-form" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : isEditing ? 'Salvar alterações' : 'Criar produto'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
