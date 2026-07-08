'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Form } from '@/components/forms/form';
import { Button } from '@/components/ui/button';
import { LogOut, MenuIcon } from 'lucide-react';
import { logoutAction } from '@/actions/user/auth';
import { useState } from 'react';
import { User } from '@/lib/types/user.types';
import { menuItemsByRole } from '@/lib/navigation/menu-items';
import SidebarLinkItem from './sidebarLinkItem';

interface SidebarProps {
  user: User;
  userName?: string;
  menuItems?: { href: string; label: string; icon: React.ReactNode }[];
}

export default function SidebarMobile({
  user,
  userName = user?.name || '',
  menuItems = user ? menuItemsByRole[user.role] : [],
}: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="lg:hidden">
      <header className="sticky top-0 z-50 border-b border-app-border ">
        <div className="flex items-center justify-between h-16 p-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>
              <Button variant="ghost" size="icon" className="p-2">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-64 bg-app-sidebar border-app-border p-6"
            >
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold mb-4">
                  Menu
                </SheetTitle>
                <SheetDescription>
                  Sujeito<span className="text-red-500">Pizzaria</span>
                </SheetDescription>
              </SheetHeader>

              <nav className="flex flex-col p-4 space-y-4">
                {menuItems.map((item, index) => (
                  <SidebarLinkItem
                    key={`${item.label}-${index}`}
                    href={item.href}
                    label={item.label}
                    icon={item.icon}
                    isActive={pathname === item.href}
                    styles="w-full hover:text-white focus:text-white"
                  />
                ))}
              </nav>

              <SheetFooter>
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
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <h1 className="text-2xl font-bold">
            Sujeito<span className="text-red-500">Pizzaria</span>
          </h1>
          <p className="text-sm text-gray-400">Olá, {userName}</p>
        </div>
      </header>
    </aside>
  );
}
