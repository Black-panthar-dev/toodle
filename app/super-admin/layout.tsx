import { requireRole } from "@/lib/auth-guard";

export default async function SuperAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireRole("SUPER_ADMIN");

  return <div className="role-layout role-layout--super-admin">{children}</div>;
}
