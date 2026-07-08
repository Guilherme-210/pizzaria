import { requireKitchenUser } from '@/lib/auth';

export default async function CozinhaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireKitchenUser();

  return <div>{children}</div>;
}
