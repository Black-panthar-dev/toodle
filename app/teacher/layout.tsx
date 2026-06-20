import { requireRole } from "@/lib/auth-guard";

export default async function TeacherLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireRole("TEACHER");

  return <div className="role-layout role-layout--teacher">{children}</div>;
}
