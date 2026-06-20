import { RoleRoutePlaceholder } from "@/components/role-route-placeholder";

type TeacherRolePlaceholderPageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export default async function TeacherRolePlaceholderPage({
  params,
}: TeacherRolePlaceholderPageProps) {
  const { slug } = await params;

  return <RoleRoutePlaceholder role="TEACHER" segments={slug} />;
}
