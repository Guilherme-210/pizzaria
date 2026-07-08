import { getUser } from '@/lib/auth';
import LayoutContent from './LayoutContent';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  if (!user) {
    return <>{children}</>;
  }

  return <LayoutContent user={user}>{children}</LayoutContent>;
}
