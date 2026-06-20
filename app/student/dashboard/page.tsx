import { DashboardShell } from "@/components/dashboard-shell";
import { dashboardNav } from "@/lib/site-content";

export default function StudentDashboardPage() {
  return (
    <DashboardShell
      role="Student"
      title="Learning home"
      description="Students will use this area for enrolled courses, lesson progress, subscription visibility, and payment proof history."
      navItems={dashboardNav.student}
      metrics={[
        { label: "Access model", value: "3-part check" },
        { label: "Payments", value: "Proof upload" },
        { label: "Progress", value: "Lesson-based" },
      ]}
      focusItems={[
        "Course access will depend on subscription, enrollment, and published course state.",
        "The subscription page will become the center of plan selection and payment proof upload.",
        "Progress tracking will connect lesson opens and completions to student visibility.",
      ]}
    />
  );
}
