import { requireAdminUser } from '@/actions/user/auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdminUser();

  return <div>{children}</div>;
}
