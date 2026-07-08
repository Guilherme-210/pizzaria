import { getUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  if (user) {
    if (user.role !== 'CUSTOMER') {
      redirect('/cozinha');
    } else {
      redirect('/cardapio');
    }
  }
}
