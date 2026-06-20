import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getDashboardPath, isAppRole } from "@/lib/permissions";

export default async function AuthRedirectPage() {
  const session = await auth();

  if (!session?.user?.role || !isAppRole(session.user.role)) {
    redirect("/login");
  }

  redirect(getDashboardPath(session.user.role));
}
