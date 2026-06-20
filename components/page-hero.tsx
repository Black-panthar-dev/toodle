type Action = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: Action[];
}) {
  return (
    <section className="hero-panel">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="hero-panel__title">{title}</h1>
      <p className="hero-panel__description">{description}</p>
      {actions ? (
        <div className="hero-panel__actions">
          {actions.map((action) => (
            <a
              key={action.href}
              href={action.href}
              className={
                action.variant === "secondary" ? "button button--secondary" : "button button--primary"
              }
            >
              {action.label}
            </a>
          ))}
        </div>
      ) : null}
    </section>
  );
}
