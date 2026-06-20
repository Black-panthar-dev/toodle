import Link from "next/link";
import { publicNavLinks } from "@/lib/site-content";

export function PublicSiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <Link href="/" className="brand-mark">
          <span className="brand-mark__badge">Toodle</span>
          <span className="brand-mark__text">Learning built for clarity, rhythm, and growth.</span>
        </Link>
        <nav className="site-nav" aria-label="Primary">
          {publicNavLinks.map((link) => (
            <Link key={link.href} href={link.href} className="site-nav__link">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="site-header__actions">
          <Link href="/login" className="button button--ghost">
            Login
          </Link>
          <Link href="/register" className="button button--primary">
            Register
          </Link>
        </div>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div>
          <p className="site-footer__title">Toodle LMS</p>
          <p className="site-footer__text">
            Subscription-based online learning for tutoring, structured lessons, and progress visibility.
          </p>
        </div>
        <div className="site-footer__links">
          <Link href="/courses">Browse courses</Link>
          <Link href="/classes">Explore classes</Link>
          <Link href="/contact-us">Contact us</Link>
        </div>
      </footer>
    </div>
  );
}
