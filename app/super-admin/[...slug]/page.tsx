import { RoleRoutePlaceholder } from "@/components/role-route-placeholder";

type SuperAdminRolePlaceholderPageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export default async function SuperAdminRolePlaceholderPage({
  params,
}: SuperAdminRolePlaceholderPageProps) {
  const { slug } = await params;

  return <RoleRoutePlaceholder role="SUPER_ADMIN" segments={slug} />;
}
