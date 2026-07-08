import { getUser } from '@/actions/user/auth';
import Sidebar from '@/components/dashboard/sidebar';
import { menuItemsByRole } from '@/lib/navigation/menu-items';
import { redirect } from 'next/navigation';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  if (user) {
    const pathname =
      typeof window !== 'undefined' ? window.location.pathname : '';
    console.log('Current pathname:', pathname);

    if (pathname === '/login' || pathname === '/register') {
      const menuItems = menuItemsByRole[user.role];
      return (
        <div>
          <Sidebar userName={user.name} menuItems={menuItems} />
          {children}
        </div>
      );
    }
  }

  return <div>{children}</div>;
}
