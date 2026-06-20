import { PageHero } from "@/components/page-hero";
import { featuredCourses } from "@/lib/site-content";

export default function CoursesPage() {
  return (
    <div className="page-stack">
      <PageHero
        eyebrow="Courses"
        title="Course discovery is public. Course access is controlled."
        description="The MVP does not sell courses individually. Learners need an active subscription, active enrollment, and a published course before lessons unlock."
      />

      <section className="content-grid">
        {featuredCourses.map((course) => (
          <article key={course.title} className="content-card content-card--accent">
            <p className="content-card__meta">
              {course.level} · {course.duration}
            </p>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
          </article>
        ))}
      </section>

      <section className="rule-panel">
        <p className="eyebrow">Access rule</p>
        <h2>Active Subscription + Active Enrollment + Published Course</h2>
        <p>
          This public page helps students understand the catalog, while actual learning access stays aligned with the
          LMS subscription model.
        </p>
      </section>
    </div>
  );
}
