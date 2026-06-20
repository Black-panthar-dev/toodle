export const appRoles = ["SUPER_ADMIN", "TEACHER", "STUDENT"] as const;

export type AppRole = (typeof appRoles)[number];

export function isAppRole(role: string | null | undefined): role is AppRole {
  return appRoles.includes(role as AppRole);
}

export function getDashboardPath(role: AppRole) {
  switch (role) {
    case "SUPER_ADMIN":
      return "/super-admin/dashboard";
    case "TEACHER":
      return "/teacher/dashboard";
    case "STUDENT":
      return "/student/dashboard";
  }
}

export function roleCanAccessPath(role: AppRole, pathname: string) {
  if (pathname.startsWith("/super-admin")) {
    return role === "SUPER_ADMIN";
  }

  if (pathname.startsWith("/teacher")) {
    return role === "TEACHER";
  }

  if (pathname.startsWith("/student")) {
    return role === "STUDENT";
  }

  return true;
}
