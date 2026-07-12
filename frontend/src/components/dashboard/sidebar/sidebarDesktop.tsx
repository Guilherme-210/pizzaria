'use client';

import { usePathname } from 'next/navigation';
import { Form } from '@/components/forms/form';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { logoutAction } from '@/actions/user/auth';
import SidebarLinkItem from './sidebarLinkItem';
import { menuItemsByRole } from '@/lib/navigation/menu-items';
import { User } from '@/lib/types/user.types';

interface SidebarProps {
  user: User;
  userName?: string;
  menuItems?: { href: string; label: string; icon: React.ReactNode }[];
}

export default function SidebarDesktop({
  user,
  userName = user?.name || '',
  menuItems = user ? menuItemsByRole[user.role] : [],
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 border-b-app-border bg-[#080C1A] border-r-2 text-white min-h-screen p-4">
      <div className="w-full mb-4 border-b-app-border border-b-4">
        <h1 className="text-2xl font-bold mb-4">
          Sujeito<span className="text-red-500">Pizzaria</span>
        </h1>
        <p className="text-sm text-gray-400">Olá, {userName}</p>
      </div>

      <nav className="flex-1 flex-col p-4 space-y-4">
        {menuItems.map((item, index) => (
          <SidebarLinkItem
            key={`${item.label}-${index}`}
            href={item.href}
            label={item.label}
            icon={item.icon}
            isActive={pathname === item.href}
          />
        ))}
      </nav>

      <div className="border-t border-app-border p-4">
        <Form action={logoutAction}>
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start gap-2 text-white hover:text-white"
          >
            <LogOut className="h-5 w-5" />
            Sair
          </Button>
        </Form>
      </div>
    </aside>
  );
}
