import { requireKitchenUser } from '@/actions/user/auth';

export default async function CozinhaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireKitchenUser();

  return <div>{children}</div>;
}
