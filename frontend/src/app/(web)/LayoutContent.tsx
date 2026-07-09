'use client';

import SidebarDesktop from '@/components/dashboard/sidebar/sidebarDesktop';
import SidebarMobile from '@/components/dashboard/sidebar/sidebarMobile';
import { User } from '@/lib/types/user.types';
import { usePathname } from 'next/navigation';

export default function LayoutContent({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideSidebar = ['/login', '/register', '/access-denied'].includes(
    pathname,
  );

  if (hideSidebar) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarDesktop user={user} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <SidebarMobile user={user} />

        <main className="flex-1 overflow-y-auto bg-app-background">
          <div className="container max-w-full px-4 py-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
