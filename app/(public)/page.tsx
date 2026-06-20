import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { featuredCourses, platformPillars, publicHeroStats, roleSummaries } from "@/lib/site-content";

export default function HomePage() {
  return (
    <div className="page-stack">
      <PageHero
        eyebrow="Toodle LMS MVP"
        title="A focused LMS for tutoring, subscriptions, and structured course delivery."
        description="Toodle is being built around one clear rule: students can learn only when subscription, enrollment, and course status all line up."
        actions={[
          { href: "/register", label: "Create student account" },
          { href: "/courses", label: "Browse course paths", variant: "secondary" },
        ]}
      />

      <section className="stats-grid">
        {publicHeroStats.map((stat) => (
          <article key={stat.label} className="stat-card">
            <p className="stat-card__value">{stat.value}</p>
            <p className="stat-card__label">{stat.label}</p>
          </article>
        ))}
      </section>

      <section className="content-grid content-grid--three">
        {platformPillars.map((pillar) => (
          <article key={pillar.title} className="content-card">
            <p className="eyebrow">Core pillar</p>
            <h2>{pillar.title}</h2>
            <p>{pillar.description}</p>
          </article>
        ))}
      </section>

      <section className="split-panel">
        <div className="split-panel__intro">
          <p className="eyebrow">Featured learning tracks</p>
          <h2>Public browsing stays simple while access remains protected.</h2>
          <p>
            Students can explore what Toodle offers publicly, but actual lesson access depends on the subscription-first
            LMS workflow defined for the MVP.
          </p>
        </div>
        <div className="content-grid">
          {featuredCourses.map((course) => (
            <article key={course.title} className="content-card content-card--accent">
              <p className="content-card__meta">
                {course.level} · {course.duration}
              </p>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-grid content-grid--three">
        {roleSummaries.map((role) => (
          <article key={role.role} className="content-card">
            <p className="eyebrow">{role.role}</p>
            <p>{role.description}</p>
          </article>
        ))}
      </section>

      <section className="cta-banner">
        <div>
          <p className="eyebrow">Phase 1</p>
          <h2>Public routes and role-based app structure are now the foundation.</h2>
        </div>
        <Link href="/login" className="button button--primary">
          Continue to sign in
        </Link>
      </section>
    </div>
  );
}
