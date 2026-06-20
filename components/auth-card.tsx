export function AuthCard({
  eyebrow,
  title,
  description,
  children,
  helper,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  helper: string;
}) {
  return (
    <section className="auth-shell">
      <div className="auth-panel">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="auth-panel__title">{title}</h1>
        <p className="auth-panel__description">{description}</p>
        {children}
        <p className="auth-panel__helper">{helper}</p>
      </div>
    </section>
  );
}
