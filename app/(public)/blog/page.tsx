import { PageHero } from "@/components/page-hero";
import { blogPosts } from "@/lib/site-content";

export default function BlogPage() {
  return (
    <div className="page-stack">
      <PageHero
        eyebrow="Blog"
        title="A space for learning tips, tutoring insights, and LMS thinking."
        description="This phase introduces the route and editorial style so the public site has room for future content."
      />

      <section className="content-grid">
        {blogPosts.map((post) => (
          <article key={post.title} className="content-card">
            <p className="eyebrow">Article preview</p>
            <h2>{post.title}</h2>
            <p>{post.summary}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
