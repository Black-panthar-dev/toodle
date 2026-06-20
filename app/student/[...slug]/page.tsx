import { RoleRoutePlaceholder } from "@/components/role-route-placeholder";

type StudentRolePlaceholderPageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export default async function StudentRolePlaceholderPage({
  params,
}: StudentRolePlaceholderPageProps) {
  const { slug } = await params;

  return <RoleRoutePlaceholder role="STUDENT" segments={slug} />;
}
