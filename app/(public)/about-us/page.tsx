import { PageHero } from "@/components/page-hero";
import { platformPillars, roleSummaries } from "@/lib/site-content";

export default function AboutUsPage() {
  return (
    <div className="page-stack">
      <PageHero
        eyebrow="About Toodle"
        title="Built for guided online learning, not content dumping."
        description="Toodle is shaping the MVP around clarity for administrators, focus for teachers, and clean access rules for students."
      />

      <section className="content-grid content-grid--three">
        {platformPillars.map((pillar) => (
          <article key={pillar.title} className="content-card">
            <h2>{pillar.title}</h2>
            <p>{pillar.description}</p>
          </article>
        ))}
      </section>

      <section className="content-grid content-grid--three">
        {roleSummaries.map((role) => (
          <article key={role.role} className="content-card content-card--accent">
            <p className="eyebrow">{role.role}</p>
            <p>{role.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
