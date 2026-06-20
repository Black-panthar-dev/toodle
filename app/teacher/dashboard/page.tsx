import { DashboardShell } from "@/components/dashboard-shell";
import { dashboardNav } from "@/lib/site-content";

export default function TeacherDashboardPage() {
  return (
    <DashboardShell
      role="Teacher"
      title="Assigned course workspace"
      description="Teachers own lesson content, publishing flow, and progress visibility only for their assigned courses."
      navItems={dashboardNav.teacher}
      metrics={[
        { label: "Assigned courses", value: "Scoped" },
        { label: "Lesson ownership", value: "Teacher only" },
        { label: "Student visibility", value: "Assigned only" },
      ]}
      focusItems={[
        "Lesson creation and editing routes will expand from this role area.",
        "Teacher access stays intentionally separate from payments and subscription management.",
        "Progress views will be tied to enrolled students inside assigned courses.",
      ]}
    />
  );
}
