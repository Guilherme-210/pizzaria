import { getUser } from '@/actions/user/auth';
import { RegisterForm } from '@/components/forms/register-form';

export default async function RegisterPage() {
  const user = await getUser();

  if (user) {
    // redirect('/dashboard');
    console.log('User:', user);
  }

  return (
    <main className="bg-app-background text-white min-h-screen flex items-center justify-center px-4 py-10">
      <RegisterForm />
    </main>
  );
}
