'use client';

import Link from 'next/link';
import { useActionState } from 'react';

import { loginAction } from '@/actions/user/auth';

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

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

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
        <Card>
          <CardHeader className="text-white text-center">
            <CardTitle>Sujeito Pizzaria</CardTitle>
            <CardDescription>
              Preencha os dados para entrar na sua conta
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form action={formAction}>
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
                {state?.error && (
                  <p className="text-sm text-red-400" role="alert">
                    {state.error}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Digite sua senha"
                  required
                  minLength={6}
                  defaultValue={state?.fields?.password || ''}
                />
              </div>

              <div>
                <Button className="w-full" type="submit" disabled={isPending}>
                  {isPending ? 'Entrando...' : 'Acessar'}
                </Button>
              </div>
            </Form>
          </CardContent>

          <CardFooter>
            <p className="mt-6 text-center text-sm text-white/60">
              Ainda não tem conta?{' '}
              <Link
                href="/register"
                className="font-semibold text-primary hover:text-pink-300"
              >
                Cadastre-se
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
