import { getUser } from '@/lib/auth';
import { LoginForm } from '@/components/forms/login-form';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const user = await getUser();

  if (user) {
    if (user.role !== 'CUSTOMER') {
      redirect('/cozinha');
    } else {
      redirect('/cardapio');
    }
  }

  return (
    <main className="min-h-screen bg-app-background text-white flex items-center justify-center px-4 py-10">
      <LoginForm />
    </main>
  );
}
