'use client';

import { resetManagedUserPasswordAction } from '@/actions/user/users';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { User, UserRole } from '@/lib/types/user.types';
import { KeyRound, Pencil, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const roleLabels: Record<UserRole, string> = {
  CUSTOMER: 'Cliente',
  ATTENDANT: 'Atendente',
  KITCHEN: 'Cozinha',
  MANAGER: 'Gerente',
  ADMIN: 'Administrador',
  SUPER_ADMIN: 'Super administrador',
};

export default function UsersTable({
  users,
  onCreate,
  onEdit,
}: {
  users: User[];
  onCreate: () => void;
  onEdit: (user: User) => void;
}) {
  const router = useRouter();
  const [actionError, setActionError] = useState('');
  const [updatingId, setUpdatingId] = useState('');

  async function handleResetPassword(user: User) {
    setActionError('');
    setUpdatingId(user.id);
    const result = await resetManagedUserPasswordAction(user.id);
    setUpdatingId('');

    if (!result.success) {
      setActionError(result.message);
      return;
    }

    router.refresh();
  }

  return (
    <section className="space-y-5">
      <div>
        <div className="flex items-center justify-between gap-4"><div><h1 className="text-2xl font-bold tracking-tight">Usuários</h1><p className="mt-1 text-sm text-white/60">Gerencie os usuários da pizzaria.</p></div><Button onClick={onCreate}><Plus />Novo usuário</Button></div>
      </div>

      {actionError && <p className="text-sm text-destructive" role="alert">{actionError}</p>}

      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111728]">
        <Table className="min-w-[720px]">
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="px-4 font-semibold text-white">Nome</TableHead>
              <TableHead className="font-semibold text-white">E-mail</TableHead>
              <TableHead className="font-semibold text-white">Função</TableHead>
              <TableHead className="font-semibold text-white">Status</TableHead>
              <TableHead className="px-4 text-right font-semibold text-white">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="py-10 text-center text-white/60">Nenhum usuário cadastrado.</TableCell></TableRow>
            ) : users.map((user) => (
              <TableRow key={user.id} className="border-white/10">
                <TableCell className="px-4 font-medium text-white">{user.name}</TableCell>
                <TableCell className="text-white/70">{user.email}</TableCell>
                <TableCell><span className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-white/70">{roleLabels[user.role]}</span></TableCell>
                <TableCell><span className={user.active ? 'text-emerald-400' : 'text-white/45'}>{user.active ? 'Ativo' : 'Inativo'}</span></TableCell>
                <TableCell className="px-4"><div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => onEdit(user)}><Pencil />Editar</Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => handleResetPassword(user)} disabled={updatingId === user.id}>
                    <KeyRound />{updatingId === user.id ? 'Redefinindo...' : 'Redefinir senha'}
                  </Button>
                </div></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
