'use client'

import Link from 'next/link';

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
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Form } from './form';

export function RegisterForm() {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(registerAction, null)

  useEffect(() => {
    if (state?.success && state?.redirectTo) {
      router.replace(state.redirectTo)
    }
  }, [state, router])

  return (
    <Card>
      <CardHeader className="text-white text-center">
        <CardTitle>Sujeito Prizzaria</CardTitle>
        <CardDescription>
          Preencha os dados para criar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form action={formAction}>
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Digite o seu nome"
              required
              minLength={3}
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
            />
          </div>

          {state?.error && (
            <p className="text-sm text-red-400">{state.error}</p>
          )}

          <div>
            <Button className="w-full" type='submit'>{isPending ? "Cadastrando..." : "Cadastre-se"}</Button>
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
  );
}
