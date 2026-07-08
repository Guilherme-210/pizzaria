import type { UserRole } from '@/lib/types/user.types';
import {
  BarChart3Icon,
  ChefHatIcon,
  ClipboardListIcon,
  PackageIcon,
  SettingsIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  TagIcon,
  UsersIcon,
  UtensilsIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';

export type MenuItem = {
  href: string;
  label: string;
  icon: ReactNode;
};

const kitchenMenuItems: MenuItem[] = [
  { href: '/cozinha', label: 'Cozinha', icon: <ChefHatIcon /> },
  {
    href: '/cozinha/finalizados',
    label: 'Pedidos Finalizados',
    icon: <ClipboardListIcon />,
  },
];

const managerMenuItems: MenuItem[] = [
  ...kitchenMenuItems,
  { href: '/admin/produtos', label: 'Produtos', icon: <PackageIcon /> },
  { href: '/admin/categorias', label: 'Categorias', icon: <TagIcon /> },
  { href: '/admin/mesas', label: 'Mesas', icon: <UtensilsIcon /> },
  {
    href: '/admin/relatorios',
    label: 'Relatórios',
    icon: <BarChart3Icon />,
  },
];

const adminMenuItems: MenuItem[] = [
  ...managerMenuItems,
  { href: '/admin/usuarios', label: 'Usuários', icon: <UsersIcon /> },
  {
    href: '/admin/configuracoes',
    label: 'Configurações',
    icon: <SettingsIcon />,
  },
];

export const menuItemsByRole: Record<UserRole, MenuItem[]> = {
  CUSTOMER: [
    { href: '/cardapio', label: 'Cardápio', icon: <PackageIcon /> },
    { href: '/carrinho', label: 'Carrinho', icon: <ShoppingCartIcon /> },
    {
      href: '/meus-pedidos',
      label: 'Meus Pedidos',
      icon: <ClipboardListIcon />,
    },
    {
      href: '/meus-dados',
      label: 'Meus Dados',
      icon: <ShieldCheckIcon />,
    },
  ],
  ATTENDANT: kitchenMenuItems,
  KITCHEN: kitchenMenuItems,
  MANAGER: managerMenuItems,
  ADMIN: adminMenuItems,
  SUPER_ADMIN: adminMenuItems,
};
