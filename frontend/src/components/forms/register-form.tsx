'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

import { registerAction } from '@/actions/user/auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Form } from './form';
import { BoxAlert } from '../ui/alert';

export function RegisterForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(registerAction, null);

  useEffect(() => {
    if (state?.success && state?.redirectTo) {
      router.replace(state.redirectTo);
    }
  }, [state, router]);

  if (state?.error === 'Usuário já existe') {
    router.replace('/login');
  }

  return (
    <div>
      {state?.error && (
        <BoxAlert title={'Error'} description={state.error} type="error" />
      )}

      {state?.success && (
        <BoxAlert
          title={'Sucesso'}
          description={'Cadastro realizado com sucesso.'}
          type="success"
        />
      )}

      <div>
        <Card className="bg-app-background text-white items-center relative w-full">
          <CardHeader className="text-white text-center">
            <CardTitle>Sujeito Pizzaria</CardTitle>
            <CardDescription>
              Preencha os dados para criar sua conta
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form action={formAction} encType="multipart/form-data">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Digite o seu nome"
                  required
                  minLength={3}
                  defaultValue={state?.fields?.name || ''}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Digite seu e-mail"
                  required
                  defaultValue={state?.fields?.email || ''}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Digite sua senha"
                  required
                  defaultValue={state?.fields?.password || ''}
                  minLength={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirme a sua senha</Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirme sua senha"
                  required
                  defaultValue={state?.fields?.confirmPassword || ''}
                  minLength={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Foto de perfil (opcional)</Label>
                <Input id="image" name="image" type="file" accept="image/*" />
                <p className="text-xs text-white/60">
                  Se não enviar uma foto, usaremos um avatar padrão.
                </p>
              </div>

              <div>
                <Button className="w-full" type="submit" disabled={isPending}>
                  {isPending ? 'Cadastrando...' : 'Cadastre-se'}
                </Button>
              </div>
            </Form>
          </CardContent>

          <CardFooter>
            <p className="mt-6 text-center text-sm text-white/60">
              Já tenho uma conta?{' '}
              <Link
                href="/login"
                className="font-semibold text-primary hover:text-pink-300"
              >
                Faça login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
