import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { getUser } from '@/actions/user/auth';
import Sidebar from '@/components/dashboard/sidebar';

import {
  ChefHatIcon,
  PackageIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  TagIcon,
  UsersIcon,
} from 'lucide-react';
import { redirect } from 'next/navigation';

const menuItems = [
  { href: '/cozinha', label: 'Cozinha', icon: <ChefHatIcon /> },
  { href: '#', label: 'Pedidos', icon: <ShoppingCartIcon /> },
  { href: '#', label: 'Categorias', icon: <TagIcon /> },
  { href: '#', label: 'Meus Dados', icon: <ShieldCheckIcon /> },
  { href: '#', label: 'Usuários', icon: <UsersIcon /> },
  { href: '/cardapio', label: 'Cardápio', icon: <PackageIcon /> },
];
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Sujeito Pizzaria',
  description: 'Sistema de gerenciamento da Sujeito Pizzaria',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Sidebar userName={user.name} menuItems={menuItems} />
        {children}
      </body>
    </html>
  );
}
