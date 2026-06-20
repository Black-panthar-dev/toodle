import { DashboardShell } from "@/components/dashboard-shell";
import { dashboardNav } from "@/lib/site-content";

export default function SuperAdminDashboardPage() {
  return (
    <DashboardShell
      role="Super Admin"
      title="Platform control center"
      description="This area is scaffolded for user management, course governance, payments, subscriptions, and reporting."
      navItems={dashboardNav.superAdmin}
      metrics={[
        { label: "Teachers to manage", value: "Role flow" },
        { label: "Payments review", value: "Pending queue" },
        { label: "Subscription model", value: "Manual approval" },
      ]}
      focusItems={[
        "Teacher and student management screens will attach here next.",
        "Course, enrollment, and membership operations stay under the /super-admin route group.",
        "Payment approval and subscription activation will follow the fixed MVP access rule.",
      ]}
    />
  );
}
