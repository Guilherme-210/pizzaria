'use client';

import { User } from '@/lib/types/user.types';
import { useState } from 'react';
import UserManagementDialog from './user-management-dialog';
import UsersTable from './users-table';

export default function ContentUsuariosPage({ users, currentUser }: { users: User[]; currentUser: User }) {
  const [isCreating, setIsCreating] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  return (
    <div>
      <UsersTable
        users={users}
        onCreate={() => setIsCreating(true)}
        onEdit={setEditingUser}
      />
      <UserManagementDialog
        isOpen={isCreating || editingUser !== null}
        setOpen={(open) => {
          if (!open) {
            setIsCreating(false);
            setEditingUser(null);
          }
        }}
        user={editingUser}
        currentUser={currentUser}
      />
    </div>
  );
}
