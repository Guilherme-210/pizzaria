import { getUser } from '@/actions/user/auth';
import { LoginForm } from '@/components/forms/login-form';
// import { getUser } from '@/lib/cookies/authCookies';

export default async function LoginPage() {
  const user = await getUser();

  console.log('===========================');
  console.log('User:', user);
  console.log('===========================');

  return (
    <main className="min-h-screen bg-app-background text-white flex items-center justify-center px-4 py-10">
      <LoginForm />
    </main>
  );
}
