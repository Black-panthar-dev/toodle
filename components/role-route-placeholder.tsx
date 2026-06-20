import { DashboardShell } from "@/components/dashboard-shell";
import { type AppRole, getDashboardPath } from "@/lib/permissions";
import { dashboardNav } from "@/lib/site-content";

type RoleRoutePlaceholderProps = {
  role: AppRole;
  segments: string[];
};

const roleConfig = {
  SUPER_ADMIN: {
    label: "Super Admin",
    navItems: dashboardNav.superAdmin,
    title: "Platform operations scaffold",
    description:
      "This protected route is reserved for Phase 1 management work and is now available as a non-404 scaffold.",
  },
  TEACHER: {
    label: "Teacher",
    navItems: dashboardNav.teacher,
    title: "Teaching workspace scaffold",
    description:
      "This protected route is reserved for Phase 1 teaching tools and is now available as a non-404 scaffold.",
  },
  STUDENT: {
    label: "Student",
    navItems: dashboardNav.student,
    title: "Learning workspace scaffold",
    description:
      "This protected route is reserved for Phase 1 student features and is now available as a non-404 scaffold.",
  },
} as const;

function titleizeSegment(segment: string) {
  return segment
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatRouteLabel(segments: string[]) {
  return segments.map(titleizeSegment).join(" / ");
}

export function RoleRoutePlaceholder({
  role,
  segments,
}: RoleRoutePlaceholderProps) {
  const config = roleConfig[role];
  const routeLabel = formatRouteLabel(segments);
  const routePath = `${getDashboardPath(role).replace("/dashboard", "")}/${segments.join("/")}`;

  return (
    <DashboardShell
      role={config.label}
      title={config.title}
      description={config.description}
      navItems={config.navItems}
      metrics={[
        { label: "Route", value: routeLabel },
        { label: "Status", value: "Scaffolded" },
        { label: "Path", value: routePath },
      ]}
      focusItems={[
        "Route architecture now matches the protected area plan closely enough to keep navigation stable during implementation.",
        "The next build step here is replacing this scaffold with real React Server Component reads and Route Handler writes.",
        "Use the Phase 1 checklist document to decide which feature slice should land here first.",
      ]}
    />
  );
}
