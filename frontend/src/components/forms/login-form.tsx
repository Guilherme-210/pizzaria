import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Form } from './form';

export function LoginForm() {
  return (
    <Card>
      <CardHeader className="text-white text-center">
        <CardTitle>Sujeito Prizzaria</CardTitle>
        <CardDescription>
          Preencha os dados para entrar na sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Digite o seu email"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              type="password"
              id="password"
              placeholder="Digite a sua senha"
              required
            />
          </div>

          <div>
            <Button className="w-full">Acessar</Button>
          </div>
        </Form>
      </CardContent>
      <CardFooter>
        <p className="mt-6 text-center text-sm text-white/60">
          Ainda não tem conta?{' '}
          <Link
            href="/registe"
            className="font-semibold text-primary hover:text-pink-300"
          >
            Faça cadastro
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
