import UserForm from '@/components/user/user-form';
import { getUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function MeusDadosPage() {
  const user = await getUser();

  if (!user) redirect('/login');

  return (
    <section className="mx-auto w-full max-w-2xl space-y-6 rounded-xl border border-white/10 bg-[#111728] p-6">
      <div>
        <h1 className="text-2xl font-bold">Meus dados</h1>
        <p className="mt-1 text-sm text-white/60">Atualize suas informações pessoais e senha.</p>
      </div>
      <UserForm user={user} />
    </section>
  );
}
