'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  createCategoriaAction,
  editCategoriaAction,
} from '@/actions/categories';
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
import { useRouter } from 'next/navigation';

type CategoryFormValues = {
  name: string;
};

export default function CategoryDialog({
  isOpen,
  setOpen,
  editingId,
  categoryName,
}: {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingId: string;
  categoryName: string;
}) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    defaultValues: {
      name: categoryName ?? '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        name: editingId ? categoryName : '',
      });
    }
  }, [categoryName, editingId, isOpen, reset]);

  function createFormData(data: CategoryFormValues) {
    const formData = new FormData();
    formData.append('name', data.name.trim());

    return formData;
  }

  async function onSubmit(data: CategoryFormValues) {
    setSubmitError('');

    const formData = createFormData(data);
    const result = editingId
      ? await editCategoriaAction(formData, editingId)
      : await createCategoriaAction(formData);

    if (!result.success) {
      setSubmitError(result.message);
      return;
    }

    setOpen(false);
    router.refresh();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md space-y-4">
        <DialogHeader>
          <DialogTitle>{editingId ? 'Editar' : 'Criar'} Categoria</DialogTitle>
          <DialogDescription>
            {editingId ? 'Edite' : 'Crie'} uma categoria para o cardápio.
          </DialogDescription>
        </DialogHeader>

        <Form
          id="category-form"
          className="flex items-center gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-3 w-full">
            <Label htmlFor="name">Nome da categoria</Label>
            <Input
              id="name"
              type="text"
              placeholder="Digite o nome da categoria"
              aria-invalid={!!errors.name}
              aria-describedby={
                errors.name || submitError ? 'category-name-error' : undefined
              }
              {...register('name', {
                required: 'Informe o nome da categoria.',
                validate: (value) =>
                  value.trim().length > 0 || 'Informe o nome da categoria.',
              })}
            />
            {(errors.name?.message || submitError) && (
              <p id="category-name-error" className="text-sm text-red-500">
                {errors.name?.message ?? submitError}
              </p>
            )}
          </div>
        </Form>

        <DialogFooter>
          <DialogClose>Cancelar</DialogClose>

          <Button type="submit" form="category-form" disabled={isSubmitting}>
            {editingId ? 'Editar' : 'Criar'} categoria
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
