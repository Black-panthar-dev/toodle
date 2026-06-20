export const publicNavLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/classes", label: "Classes" },
  { href: "/about-us", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact-us", label: "Contact" },
];

export const publicHeroStats = [
  { label: "Core Roles", value: "3" },
  { label: "Access Rule", value: "3 checks" },
  { label: "MVP Model", value: "Subscription" },
];

export const featuredCourses = [
  {
    title: "English Basics",
    level: "Beginner",
    duration: "8 Weeks",
    description:
      "Foundational grammar, guided speaking practice, and structured weekly lessons.",
  },
  {
    title: "Mathematics Jumpstart",
    level: "Intermediate",
    duration: "12 Lessons",
    description:
      "A tutoring-first learning path focused on confidence, repetition, and measurable progress.",
  },
  {
    title: "Science Essentials",
    level: "Beginner",
    duration: "4 Weeks",
    description:
      "Short lesson blocks for revision, concept clarity, and flexible online study.",
  },
];

export const platformPillars = [
  {
    title: "Subscription-first learning",
    description:
      "Students subscribe to the platform, then Super Admin assigns the right courses for their learning path.",
  },
  {
    title: "Teacher-owned lessons",
    description:
      "Teachers manage lessons inside assigned courses and track how enrolled students are progressing.",
  },
  {
    title: "Structured student access",
    description:
      "Course access requires an active subscription, active enrollment, and a published course.",
  },
];

export const classHighlights = [
  "Flexible schedules built for school, tutoring, and self-paced revision.",
  "Guided online learning with teacher support and lesson-by-lesson progress tracking.",
  "Category-led discovery so students can understand the right path before registering.",
  "A simple next step: browse courses, register, and wait for enrollment approval.",
];

export const blogPosts = [
  {
    title: "How to keep online learners consistent",
    summary:
      "Practical ideas for structuring lessons, progress milestones, and parent-facing updates.",
  },
  {
    title: "Designing tutoring-first course flows",
    summary:
      "What changes when an LMS is built around enrollment, teacher guidance, and subscriptions.",
  },
  {
    title: "Student momentum after week one",
    summary:
      "A short playbook for reducing drop-off and keeping learners active after onboarding.",
  },
];

export const roleSummaries = [
  {
    role: "Super Admin",
    description:
      "Manages users, courses, enrollments, memberships, payments, subscriptions, and reporting.",
  },
  {
    role: "Teacher",
    description:
      "Owns lesson content for assigned courses and monitors enrolled student progress.",
  },
  {
    role: "Student",
    description:
      "Accesses assigned courses, completes lessons, manages subscriptions, and uploads payment proof.",
  },
];

export const dashboardNav = {
  superAdmin: [
    { href: "/super-admin/dashboard", label: "Dashboard" },
    { href: "/super-admin/courses", label: "Courses" },
    { href: "/super-admin/payments", label: "Payments" },
    { href: "/super-admin/reports", label: "Reports" },
  ],
  teacher: [
    { href: "/teacher/dashboard", label: "Dashboard" },
    { href: "/teacher/courses", label: "Courses" },
    { href: "/teacher/students", label: "Students" },
    { href: "/teacher/progress", label: "Progress" },
  ],
  student: [
    { href: "/student/dashboard", label: "Dashboard" },
    { href: "/student/courses", label: "Courses" },
    { href: "/student/progress", label: "Progress" },
    { href: "/student/subscription", label: "Subscription" },
  ],
};
