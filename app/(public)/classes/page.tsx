import { PageHero } from "@/components/page-hero";
import { classHighlights } from "@/lib/site-content";

export default function ClassesPage() {
  return (
    <div className="page-stack">
      <PageHero
        eyebrow="Classes"
        title="An informational classes page for how learning works inside Toodle."
        description="This MVP page explains the online learning experience without live booking, meeting links, attendance, or scheduling tools."
      />

      <section className="content-grid content-grid--two">
        {classHighlights.map((highlight) => (
          <article key={highlight} className="content-card">
            <p>{highlight}</p>
          </article>
        ))}
      </section>

      <section className="content-grid content-grid--three">
        {["Languages", "STEM support", "Revision tracks"].map((category) => (
          <article key={category} className="content-card content-card--accent">
            <p className="eyebrow">Category</p>
            <h2>{category}</h2>
            <p>Clear lesson paths, online tutor support, and flexible progress tracking for each category.</p>
          </article>
        ))}
      </section>
    </div>
  );
}
