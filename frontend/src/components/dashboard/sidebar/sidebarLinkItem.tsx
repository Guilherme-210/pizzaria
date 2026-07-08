import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function SidebarLinkItem({
  href,
  label,
  icon,
  isActive,
  styles,
}: {
  href: string;
  label: string;
  icon?: React.ReactNode;
  isActive: boolean;
  styles?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 py-2 px-3 rounded-md transition-colors duration-300 text-sm font-medium',
        isActive ? 'bg-red-700 text-white' : 'hover:bg-gray-700 text-gray-300',
        styles,
      )}
      aria-label={`Navegue para ${label}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </Link>
  );
}
