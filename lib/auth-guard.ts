import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getDashboardPath, isAppRole, type AppRole } from "@/lib/permissions";

export async function requireRole(role: AppRole) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const userRole = session.user.role;

  if (!isAppRole(userRole)) {
    redirect("/login");
  }

  if (userRole !== role) {
    redirect(getDashboardPath(userRole));
  }

  return session;
}
