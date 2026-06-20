import Link from "next/link";

type NavItem = {
  href: string;
  label: string;
};

type Metric = {
  label: string;
  value: string;
};

export function DashboardShell({
  role,
  title,
  description,
  navItems,
  metrics,
  focusItems,
}: {
  role: string;
  title: string;
  description: string;
  navItems: NavItem[];
  metrics: Metric[];
  focusItems: string[];
}) {
  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <p className="dashboard-sidebar__role">{role}</p>
        <h1 className="dashboard-sidebar__title">{title}</h1>
        <p className="dashboard-sidebar__description">{description}</p>
        <nav className="dashboard-sidebar__nav" aria-label={`${role} navigation`}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="dashboard-sidebar__link">
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <section className="dashboard-content">
        <div className="dashboard-metrics">
          {metrics.map((metric) => (
            <article key={metric.label} className="dashboard-metric">
              <p className="dashboard-metric__label">{metric.label}</p>
              <p className="dashboard-metric__value">{metric.value}</p>
            </article>
          ))}
        </div>
        <article className="dashboard-focus">
          <p className="eyebrow">Phase 1 scaffold</p>
          <h2 className="dashboard-focus__title">This role area is now in place for the next build steps.</h2>
          <ul className="dashboard-focus__list">
            {focusItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
