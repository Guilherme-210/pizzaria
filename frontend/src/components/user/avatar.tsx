import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserCircleIcon } from 'lucide-react';
import Link from 'next/link';

interface AvatarIconProps {
  src?: string;
  alt?: string;
}

export function AvatarDemo({ src, alt }: AvatarIconProps) {
  return (
    <Avatar>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>
        <UserCircleIcon />
      </AvatarFallback>
      <AvatarBadge className="bg-green-600 dark:bg-green-800" />
    </Avatar>
  );
}

export function AvatarWithBadge({ src, alt }: AvatarIconProps) {
  return (
    <Avatar>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>
        <UserCircleIcon />
      </AvatarFallback>
      <AvatarBadge className="bg-green-600 dark:bg-green-800" />
    </Avatar>
  );
}

export function AvatarDropdown({ src, alt }: AvatarIconProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage src={src} alt={alt} />
            <AvatarFallback>
              <UserCircleIcon />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AvatarButton({ src, alt }: AvatarIconProps) {
  return (
    <Button variant="ghost" size="icon" className="rounded-full" asChild>
      <Link href="/meus-dados" aria-label="Editar meus dados">
        <Avatar>
          <AvatarImage src={src} alt={alt} />
          <AvatarFallback>
            <UserCircleIcon />
          </AvatarFallback>
        </Avatar>
      </Link>
    </Button>
  );
}
