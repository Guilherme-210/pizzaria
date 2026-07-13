'use client';

import { updateOwnUserAction } from '@/actions/user/users';
import { Form } from '@/components/forms/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '@/lib/types/user.types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type UserFormValues = {
  name: string;
  email: string;
  image: string;
  password: string;
  confirmPassword: string;
};

export default function UserForm({ user }: { user: User }) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValues>({
    defaultValues: {
      name: user.name,
      email: user.email,
      image: user.image ?? '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: UserFormValues) {
    setSubmitError('');
    setSuccessMessage('');

    if (data.password && data.password !== data.confirmPassword) {
      setSubmitError('As senhas não coincidem.');
      return;
    }

    const formData = new FormData();
    formData.append('name', data.name.trim());
    formData.append('email', data.email.trim());
    formData.append('image', data.image.trim());
    formData.append('password', data.password);
    formData.append('confirmPassword', data.confirmPassword);

    const result = await updateOwnUserAction(formData);

    if (!result.success) {
      setSubmitError(result.message);
      return;
    }

    setSuccessMessage(result.message);
    router.refresh();
  }

  return (
    <Form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="user-name">Nome</Label>
          <Input
            id="user-name"
            aria-invalid={Boolean(errors.name)}
            {...register('name', { required: 'Informe o nome.' })}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="user-image">URL da imagem de perfil</Label>
          <Input
            id="user-image"
            type="url"
            placeholder="https://exemplo.com/minha-foto.jpg"
            aria-invalid={Boolean(errors.image)}
            {...register('image', {
              pattern: {
                value: /^(|https?:\/\/\S+)$/,
                message: 'Informe uma URL válida.',
              },
            })}
          />
          {errors.image && (
            <p className="text-sm text-destructive">{errors.image.message}</p>
          )}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="user-email">E-mail</Label>
          <Input
            id="user-email"
            type="email"
            aria-invalid={Boolean(errors.email)}
            {...register('email', {
              required: 'Informe o e-mail.',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Informe um e-mail válido.',
              },
            })}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="user-password">Nova senha</Label>
          <Input
            id="user-password"
            type="password"
            placeholder="Deixe em branco para manter"
            aria-invalid={Boolean(errors.password)}
            {...register('password', {
              minLength: {
                value: 6,
                message: 'A senha deve ter ao menos 6 caracteres.',
              },
            })}
          />
          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="user-confirm-password">Confirmar nova senha</Label>
          <Input
            id="user-confirm-password"
            type="password"
            placeholder="Repita a nova senha"
            aria-invalid={Boolean(errors.confirmPassword)}
            {...register('confirmPassword')}
          />
        </div>
      </div>

      {submitError && (
        <p className="text-sm text-destructive" role="alert">
          {submitError}
        </p>
      )}
      {successMessage && (
        <p className="text-sm text-emerald-400" role="status">
          {successMessage}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Salvando...' : 'Salvar alterações'}
      </Button>
    </Form>
  );
}
