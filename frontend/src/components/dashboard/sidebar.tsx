'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface SidebarProps {
  userName: string;
  menuItems: { href: string; label: string; icon: React.ReactNode }[];
}

export default function Sidebar({ userName, menuItems }: SidebarProps) {
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
          <SidebarItem
            key={`${item.label}-${index}`}
            href={item.href}
            label={item.label}
            icon={item.icon}
            isActive={pathname === item.href}
          />
        ))}
      </nav>
    </aside>
  );
}

function SidebarItem({
  href,
  label,
  icon,
  isActive,
}: {
  href: string;
  label: string;
  icon?: React.ReactNode;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 py-2 px-3 rounded-md transition-colors duration-300 text-sm font-medium',
        isActive ? 'bg-red-700 text-white' : 'hover:bg-gray-700 text-gray-300',
      )}
      aria-label={`Navegue para ${label}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </Link>
  );
}
