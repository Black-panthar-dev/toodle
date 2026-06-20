import { PublicSiteLayout } from "@/components/public-site-layout";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PublicSiteLayout>{children}</PublicSiteLayout>;
}
