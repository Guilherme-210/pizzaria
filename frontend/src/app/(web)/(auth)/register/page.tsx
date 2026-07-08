import { getUser } from '@/actions/user/auth';
import { RegisterForm } from '@/components/forms/register-form';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {
  const user = await getUser();

  if (user) {
    if (user.role !== 'CUSTOMER') {
      redirect('/cozinha');
    } else {
      redirect('/cardapio');
    }
  }

  return (
    <main className="bg-app-background text-white min-h-screen flex items-center justify-center px-4 py-10">
      <RegisterForm />
    </main>
  );
}
