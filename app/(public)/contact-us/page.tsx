import { PageHero } from "@/components/page-hero";

export default function ContactUsPage() {
  return (
    <div className="page-stack">
      <PageHero
        eyebrow="Contact"
        title="A calm, direct place for questions from students, parents, and teachers."
        description="Use this route as the future contact hub for admissions, platform help, and subscription guidance."
      />

      <section className="content-grid content-grid--three">
        <article className="content-card">
          <p className="eyebrow">Admissions</p>
          <h2>New learner guidance</h2>
          <p>Help with registration, course browsing, and understanding how subscriptions and enrollments work.</p>
        </article>
        <article className="content-card">
          <p className="eyebrow">Support</p>
          <h2>Platform assistance</h2>
          <p>Questions about login, password reset, course access, and payment proof submission.</p>
        </article>
        <article className="content-card">
          <p className="eyebrow">Partnerships</p>
          <h2>Teaching and growth</h2>
          <p>Future teacher onboarding and learning partnership conversations can live here.</p>
        </article>
      </section>
    </div>
  );
}
