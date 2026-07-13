'use client';

import {
  createManagedUserAction,
  updateManagedUserAction,
} from '@/actions/user/users';
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
import { User } from '@/lib/types/user.types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type ManagedUserFormValues = {
  name: string;
  email: string;
  image: string;
  active: boolean;
  password: string;
  confirmPassword: string;
};

export default function UserManagementDialog({
  isOpen,
  setOpen,
  user,
}: {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  user: User | null;
}) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState('');
  const isEditing = user !== null;
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<ManagedUserFormValues>();

  useEffect(() => {
    if (!isOpen) return;
    reset({
      name: user?.name ?? '',
      email: user?.email ?? '',
      image: user?.image ?? '',
      active: user?.active ?? true,
      password: '',
      confirmPassword: '',
    });
    setSubmitError('');
  }, [isOpen, reset, user]);

  async function onSubmit(data: ManagedUserFormValues) {
    setSubmitError('');
    if (!isEditing && data.password !== data.confirmPassword) {
      setSubmitError('As senhas não coincidem.');
      return;
    }

    const formData = new FormData();
    formData.append('name', data.name.trim());
    formData.append('email', data.email.trim());
    formData.append('image', data.image.trim());
    formData.append('active', String(data.active));
    formData.append('password', data.password);
    formData.append('confirmPassword', data.confirmPassword);

    const result = isEditing
      ? await updateManagedUserAction(formData, user.id)
      : await createManagedUserAction(formData);

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
          <DialogTitle>{isEditing ? 'Editar' : 'Criar'} usuário</DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Atualize os dados do usuário. A senha não é exibida.'
              : 'Cadastre um novo usuário.'}
          </DialogDescription>
        </DialogHeader>
        <Form id="managed-user-form" className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="managed-user-name">Nome</Label><Input id="managed-user-name" aria-invalid={Boolean(errors.name)} {...register('name', { required: 'Informe o nome.' })} />{errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}</div>
            <div className="space-y-2"><Label htmlFor="managed-user-email">E-mail</Label><Input id="managed-user-email" type="email" aria-invalid={Boolean(errors.email)} {...register('email', { required: 'Informe o e-mail.' })} />{errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}</div>
            {isEditing ? (
              <>
                <div className="space-y-2 sm:col-span-2"><Label htmlFor="managed-user-image">URL da imagem</Label><Input id="managed-user-image" type="url" placeholder="https://..." {...register('image')} /></div>
                <label className="flex items-center gap-2 text-sm sm:col-span-2"><input type="checkbox" {...register('active')} /> Usuário ativo</label>
              </>
            ) : (
              <>
                <div className="space-y-2"><Label htmlFor="managed-user-password">Senha inicial</Label><Input id="managed-user-password" type="password" aria-invalid={Boolean(errors.password)} {...register('password', { required: 'Informe a senha inicial.', minLength: { value: 6, message: 'Use ao menos 6 caracteres.' } })} />{errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}</div>
                <div className="space-y-2"><Label htmlFor="managed-user-confirm-password">Confirmar senha</Label><Input id="managed-user-confirm-password" type="password" {...register('confirmPassword', { required: 'Confirme a senha.' })} /></div>
              </>
            )}
          </div>
          {submitError && <p className="text-sm text-destructive" role="alert">{submitError}</p>}
        </Form>
        <DialogFooter><DialogClose asChild><Button type="button" variant="outline" disabled={isSubmitting}>Cancelar</Button></DialogClose><Button type="submit" form="managed-user-form" disabled={isSubmitting}>{isSubmitting ? 'Salvando...' : isEditing ? 'Salvar alterações' : 'Criar usuário'}</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
