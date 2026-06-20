import { requireRole } from "@/lib/auth-guard";

export default async function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireRole("STUDENT");

  return <div className="role-layout role-layout--student">{children}</div>;
}
