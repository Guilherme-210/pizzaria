'use client';

import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';

export default function AccessDeniedPage() {
  return (
    <main className="min-h-screen bg-app-background text-white flex items-center justify-center px-4 py-10">
      <div className="text-center flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold mb-4">Acesso Negado</h1>
        <p className="text-lg">
          Você não tem permissão para acessar esta página.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <Button onClick={() => redirect('/cardapio')}>
            Ir para o Cardápio
          </Button>
          <Button onClick={() => redirect('/login')} className="ml-4">
            logar
          </Button>
          <Button onClick={() => redirect('/register')} className="ml-4">
            registrar
          </Button>
        </div>
      </div>
    </main>
  );
}
