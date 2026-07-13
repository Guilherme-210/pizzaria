'use client';

import { resetManagedUserPasswordAction } from '@/actions/user/users';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AvatarWithBadge } from '@/components/user/avatar';
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
  const [userToReset, setUserToReset] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState('');

  async function handleResetPassword() {
    if (!userToReset) return;

    setActionError('');
    setUpdatingId(userToReset.id);
    const result = await resetManagedUserPasswordAction(userToReset.id);
    setUpdatingId('');

    if (!result.success || !result.password) {
      setActionError(result.message);
      return;
    }

    setUserToReset(null);
    setNewPassword(result.password);
    router.refresh();
  }

  return (
    <section className="space-y-5">
      <div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Usuários</h1>
            <p className="mt-1 text-sm text-white/60">
              Gerencie os usuários da pizzaria.
            </p>
          </div>
          <Button onClick={onCreate}>
            <Plus />
            Novo usuário
          </Button>
        </div>
      </div>

      {actionError && (
        <p className="text-sm text-destructive" role="alert">
          {actionError}
        </p>
      )}

      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111728]">
        <Table className="min-w-[720px]">
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="px-4 font-semibold text-white">
                Nome
              </TableHead>
              <TableHead className="font-semibold text-white">E-mail</TableHead>
              <TableHead className="font-semibold text-white">Função</TableHead>
              <TableHead className="font-semibold text-white">Status</TableHead>
              <TableHead className="px-4 text-right font-semibold text-white">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-10 text-center text-white/60"
                >
                  Nenhum usuário cadastrado.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id} className="border-white/10">
                  <TableCell className="flex items-center gap-4 px-4 font-medium text-white">
                    {user.image ? (
                      <AvatarWithBadge src={user.image} alt={user.name} />
                    ) : (
                      <AvatarWithBadge alt={user.name} />
                    )}
                    {user.name}
                  </TableCell>
                  <TableCell className="text-white/70">{user.email}</TableCell>
                  <TableCell>
                    <span className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-white/70">
                      {roleLabels[user.role]}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={
                        user.active ? 'text-emerald-400' : 'text-white/45'
                      }
                    >
                      {user.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </TableCell>
                  <TableCell className="px-4">
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(user)}
                      >
                        <Pencil />
                        Editar
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setUserToReset(user)}
                        disabled={updatingId === user.id}
                      >
                        <KeyRound />
                        {updatingId === user.id
                          ? 'Redefinindo...'
                          : 'Redefinir senha'}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={userToReset !== null}
        onOpenChange={(open) => !open && setUserToReset(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Redefinir senha</DialogTitle>
            <DialogDescription>
              Deseja gerar uma nova senha para {userToReset?.name}? A senha
              atual deixará de funcionar.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                disabled={Boolean(updatingId)}
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="button"
              onClick={handleResetPassword}
              disabled={Boolean(updatingId)}
            >
              {updatingId ? 'Redefinindo...' : 'Confirmar redefinição'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(newPassword)}
        onOpenChange={(open) => !open && setNewPassword('')}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova senha gerada</DialogTitle>
            <DialogDescription>
              Copie e entregue esta senha ao usuário. Ela não será exibida
              novamente.
            </DialogDescription>
          </DialogHeader>
          <code className="rounded-md bg-muted p-3 text-center text-base font-semibold break-all">
            {newPassword}
          </code>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button">Concluir</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
